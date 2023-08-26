package com.prime.user.controller;

import com.prime.user.dto.UserDto;
import com.prime.user.service.UserProfileService;
import com.prime.user.utility.ProfileResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/profile")
public class UserProfileController {

    @Autowired
    UserProfileService userProfileService;

    @PutMapping("/update/profilePicture")
    public ResponseEntity<ProfileResponse<String>> updateProfilePicture(@RequestHeader("userId") String userId, @RequestParam("file")MultipartFile file){
         String fileUrl=userProfileService.updateProfilePicture(file,userId);
         ProfileResponse<String> profileResponse= ProfileResponse.<String>builder().data(fileUrl).status(200).message("Profile picture updated successfully").build();
           return new ResponseEntity<>(profileResponse, HttpStatus.OK);
    }
    @PutMapping("/update/fullName")
    public ResponseEntity<ProfileResponse<String>> updateName(@RequestHeader("userId") String userId, @RequestParam("fullName") String fullName){
        userProfileService.updateFullName(fullName,userId);
        ProfileResponse<String> profileResponse= ProfileResponse.<String>builder().data(fullName).status(200).message("Full name updated successfully").build();
        return new ResponseEntity<>(profileResponse, HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity<ProfileResponse<UserDto>> getUser(@RequestHeader("userId") String userId){
        UserDto userDto=userProfileService.getUser(userId);
        ProfileResponse<UserDto> profileResponse= ProfileResponse.<UserDto>builder().data(userDto).status(200).message("User profile fetched successfully").build();
        return new ResponseEntity<>(profileResponse, HttpStatus.OK);
    }







}
