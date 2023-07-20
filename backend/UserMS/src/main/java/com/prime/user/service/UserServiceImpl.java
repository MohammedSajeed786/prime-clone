package com.prime.user.service;

import com.prime.user.dto.LoginDto;
import com.prime.user.dto.RegisterDto;
import com.prime.user.dto.UserDto;
import com.prime.user.entity.User;
import com.prime.user.exception.UserException;
import com.prime.user.jwt.service.JwtService;
import com.prime.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtService jwtService;

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
}
