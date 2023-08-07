package com.prime.movie.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserDto {

    UUID userId;


    String email;


    String username;
    String fullName;
    String password;


}
