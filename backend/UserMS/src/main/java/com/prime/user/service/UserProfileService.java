package com.prime.user.service;

import com.prime.user.dto.UserDto;
import org.springframework.web.multipart.MultipartFile;

public interface UserProfileService {
    String updateProfilePicture(MultipartFile file, String userId);

    String updateFullName(String fullName, String userId);

    UserDto getUser(String userId);
}
