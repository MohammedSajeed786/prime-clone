package com.prime.user.dto;

import com.prime.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {



    private UUID userId;
    private String email;
    private String username;
    private String fullName;
    private String profilePicture;
    public User convertDtoToEntity(){
        return User.builder().email(this.email).fullName(this.fullName).username(this.username).profilePicture(this.profilePicture).build();
    }


}
