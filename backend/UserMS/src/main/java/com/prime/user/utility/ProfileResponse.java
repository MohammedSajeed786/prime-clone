package com.prime.user.utility;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ProfileResponse<T> {

    private String message;
    private Integer status;
    private  T data;
}
