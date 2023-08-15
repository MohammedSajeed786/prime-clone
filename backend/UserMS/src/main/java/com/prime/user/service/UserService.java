package com.prime.user.service;

import com.prime.user.dto.LoginDto;
import com.prime.user.dto.RegisterDto;
import com.prime.user.dto.UserDto;
import com.prime.user.exception.UserException;

public interface UserService {
    String loginUser(LoginDto userDto) throws UserException;

    String registerUser(RegisterDto userDto);

    UserDto getUser(String userId);


    String sendOtp(String email);

    void sendMessage(String to, String subject, String body);

    String verifyOtp(String email, Integer otp);

    String updatePassword(String email, String newPassword);
}
