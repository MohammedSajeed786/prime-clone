package com.prime.user.controller;

import com.prime.user.dto.ForgotPasswordDto;
import com.prime.user.dto.LoginDto;
import com.prime.user.dto.RegisterDto;
import com.prime.user.dto.UserDto;
import com.prime.user.exception.UserException;
import com.prime.user.service.UserService;
import com.prime.user.utility.AuthResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    UserService userService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> RegisterUser(@Valid  @RequestBody RegisterDto registerDto){
        String token=userService.registerUser(registerDto);
        AuthResponse authResponse=AuthResponse.builder().token(token).message("registration successful").build();
        return new ResponseEntity<>(authResponse, HttpStatus.CREATED);

    }
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> loginUser(@Valid @RequestBody LoginDto loginDto) throws UserException {
        String token=userService.loginUser(loginDto);
        AuthResponse authResponse=AuthResponse.builder().token(token).message("login successful").build();
        return new ResponseEntity<>(authResponse, HttpStatus.OK);

    }

    @GetMapping("/getUser/{userId}")
    public ResponseEntity<UserDto> getUser(@PathVariable String userId) throws UserException {
        UserDto userDto=userService.getUser(userId);
        return new ResponseEntity<>(userDto, HttpStatus.OK);

    }

    @PostMapping("/sendOtp")
    public ResponseEntity<String> sendOtp(@RequestBody ForgotPasswordDto forgotPasswordDto){
        return new ResponseEntity<>(userService.sendOtp(forgotPasswordDto.getEmail()),HttpStatus.CREATED);
    }
    @PostMapping("/verifyOtp")
    public ResponseEntity<String> verifyOtp(@RequestBody ForgotPasswordDto forgotPasswordDto){
        return new ResponseEntity<>(userService.verifyOtp(forgotPasswordDto.getEmail(),forgotPasswordDto.getOtp()),HttpStatus.CREATED);
    }
    @PostMapping("/updatePassword")
    public ResponseEntity<String> updatePassword(@RequestBody ForgotPasswordDto forgotPasswordDto){
        return new ResponseEntity<>(userService.updatePassword(forgotPasswordDto.getEmail(),forgotPasswordDto.getNewPassword()),HttpStatus.CREATED);
    }
}
