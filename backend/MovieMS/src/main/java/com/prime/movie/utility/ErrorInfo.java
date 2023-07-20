package com.prime.movie.utility;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ErrorInfo {

    private int status;
    private String error;
    private String message;
    private String timestamp;


}
