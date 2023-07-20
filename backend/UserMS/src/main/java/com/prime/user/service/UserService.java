package com.prime.user.service;

import com.prime.user.dto.LoginDto;
import com.prime.user.dto.RegisterDto;
import com.prime.user.dto.UserDto;
import com.prime.user.exception.UserException;

public interface UserService {
    String loginUser(LoginDto userDto) throws UserException;

    String registerUser(RegisterDto userDto);

    UserDto getUser(String userId);
}
