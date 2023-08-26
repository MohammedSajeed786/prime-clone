package com.prime.user.service;


import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.prime.user.dto.UserDto;
import com.prime.user.exception.AwsException;
import com.prime.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URL;
import java.util.UUID;

@Service
public class UserProfileServiceImpl implements UserProfileService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    UserService userService;
    @Value("${application.bucket.name}")
    private String bucketName;
    @Autowired
    private AmazonS3 s3Client;

    public URL uploadImage(MultipartFile file, String userId) {
        String fileName = "profilePic_" + userId;
        byte[] fileBytes = convertMultipartFileToByteArray(file);

        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(fileBytes.length);
        metadata.setContentType(file.getContentType());


        ByteArrayInputStream inputStream = new ByteArrayInputStream(fileBytes);

        s3Client.putObject(new PutObjectRequest(bucketName, fileName, inputStream, metadata));

        try {
            inputStream.close();
        } catch (IOException e) {
            throw new RuntimeException("file cannot be closed");
        }

        return s3Client.getUrl(bucketName, fileName);
    }

    byte[] convertMultipartFileToByteArray(MultipartFile file) {
        try {
            return file.getBytes();
        } catch (IOException e) {
            throw new RuntimeException("Error converting MultipartFile to byte array", e);
        }
    }

    @Override
    public String updateProfilePicture(MultipartFile file, String userId) {
        String imageUrl = uploadImage(file, userId).toString();
        if (imageUrl != null) {
            userRepository.updateProfilePicture(UUID.fromString(userId), imageUrl);
            return imageUrl;
        } else {
            throw new AwsException("some error occurred");
        }
    }

    @Override
    public String updateFullName(String fullName, String userId) {
        userRepository.updateFullName(UUID.fromString(userId), fullName);
        return userService.getUser(userId).getFullName();
    }

    public UserDto getUser(String userId) {

        return userService.getUser(userId);
    }


    File convertMultipartFileToFile(MultipartFile file) {
        File createdFile = new File(file.getOriginalFilename());
        FileOutputStream fileOutputStream = null;

        try {
            fileOutputStream = new FileOutputStream(createdFile);
            fileOutputStream.write(file.getBytes());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return createdFile;
    }
}
