package com.prime.user.service;

import com.prime.user.dto.LoginDto;
import com.prime.user.dto.RegisterDto;
import com.prime.user.dto.UserDto;
import com.prime.user.entity.User;
import com.prime.user.exception.UserException;
import com.prime.user.jwt.service.JwtService;
import com.prime.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Random;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtService jwtService;

    @Autowired
    JavaMailSender javaMailSender;

    @Override
    public String loginUser(LoginDto loginDto) throws UserException {
        Optional<User> optionalUser = userRepository.findByEmail(loginDto.getEmail());
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (passwordEncoder.matches(loginDto.getPassword(), user.getPassword())) {
                return jwtService.generateToken(user);
            } else {
                throw new UserException("invalid credentials");
            }

        } else {
            throw new UserException("user does not exist with this email");
        }
    }

    @Override
    public String registerUser(RegisterDto registerDto) {
//        System.out.println(userDto);
        Optional<User> optionalUser = userRepository.findByEmail(registerDto.getEmail());
        if (optionalUser.isPresent()) {
            throw new UserException("user already exists with this email");
        }
        optionalUser = userRepository.findByUsername(registerDto.getUsername());
        if (optionalUser.isPresent()) {
            throw new UserException("username already taken");
        }
        registerDto.setPassword(passwordEncoder.encode(registerDto.getPassword()));
        User user = registerDto.convertDtoToEntity();
        user=userRepository.save(user);
        return jwtService.generateToken(user);

    }

    @Override
    public UserDto getUser(String userId) {
//        System.out.println(userId);
        Optional<User> optionalUser= userRepository.findByUserId(UUID.fromString(userId));
        if(optionalUser.isPresent()){
            return optionalUser.get().convertEntityToUserDto();
        }
        else{
            throw new UserException("user not found");
        }
    }


    @Override
    public String sendOtp(String email){
        Optional<User> optionalUser=userRepository.findByEmail(email);
        if(optionalUser.isPresent()){
            User user=optionalUser.get();
            Random random=new Random();
            Integer otp= random.nextInt(1000)+999;
            user.setOtp(otp);
            userRepository.save(user);
            sendMessage(email,"Movie Verse: Reset Password","OTP to change your password is "+otp+". Please do not share your otp with anyone.\nThanks,\nMovie Verse Team.");
            return "otp has been sent to your email";
        }
            else throw new UserException("invalid email");

    }

    @Override
    public void sendMessage(String to, String subject, String body){
        SimpleMailMessage simpleMailMessage=new SimpleMailMessage();
        simpleMailMessage.setFrom("mdsajeedmds@gmail.com");
        simpleMailMessage.setTo(to);
        simpleMailMessage.setSubject(subject);
        simpleMailMessage.setText(body);
        javaMailSender.send(simpleMailMessage);
    }

    @Override
    public String verifyOtp(String email,Integer otp){
       Optional<User> optionalUser= userRepository.findByEmail(email);
       if(optionalUser.isPresent()){
           User user=optionalUser.get();
           if(user.getOtp().equals(otp)) return "otp verified successfully";
           else return "invalid otp";
       }
       else throw new UserException("invalid email");
    }
    @Override
    public String updatePassword(String email,String newPassword){
        Optional<User> optionalUser= userRepository.findByEmail(email);
        if(optionalUser.isPresent()){
            User user=optionalUser.get();
            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);
            return "password updated successfully";
        }
        else throw new UserException("invalid email");

    }
}
