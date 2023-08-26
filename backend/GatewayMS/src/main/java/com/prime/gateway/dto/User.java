package com.prime.gateway.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class User {

    private UUID userId;


    private String email;


    private String username;
    private String fullName;
    private String password;


}
