package com.prime.Order.utility;


import com.prime.Order.exception.OrderException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({OrderException.class})
    public ResponseEntity<ErrorInfo> orderExceptionHandler(Exception exception){
//        System.out.println("inside handler");
        ErrorInfo errorInfo=ErrorInfo.builder().message(exception.getMessage())
                .status(HttpStatus.BAD_REQUEST.value()).error(HttpStatus.BAD_REQUEST.getReasonPhrase()).timestamp(LocalDateTime.now().toString()).build();
        return new ResponseEntity<>(errorInfo,HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler({Exception.class})
    public ResponseEntity<ErrorInfo> generalExceptionHandler(Exception exception){
//        System.out.println("inside handler");
        ErrorInfo errorInfo=ErrorInfo.builder().message(exception.getMessage())
                .status(HttpStatus.BAD_REQUEST.value()).error(HttpStatus.BAD_REQUEST.getReasonPhrase()).timestamp(LocalDateTime.now().toString()).build();
        return new ResponseEntity<>(errorInfo,HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
