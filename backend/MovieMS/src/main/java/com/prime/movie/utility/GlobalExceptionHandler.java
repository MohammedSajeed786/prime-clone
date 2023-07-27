package com.prime.movie.utility;


import com.prime.movie.exception.MovieException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.List;

@RestControllerAdvice
public class GlobalExceptionHandler {



    @ExceptionHandler({MovieException.class})
    public ResponseEntity<ErrorInfo> movieExceptionHandler(Exception exception){
//        System.out.println("inside handler");
        ErrorInfo errorInfo=ErrorInfo.builder().message(exception.getMessage())
                .status(HttpStatus.BAD_REQUEST.value()).error(HttpStatus.BAD_REQUEST.getReasonPhrase()).timestamp(LocalDateTime.now().toString()).build();
        return new ResponseEntity<>(errorInfo,HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler({RuntimeException.class})
    public ResponseEntity<ErrorInfo> runtimeExceptionHandler(Exception exception){
//        System.out.println("inside handler");
        ErrorInfo errorInfo=ErrorInfo.builder().message(exception.getMessage())
                .status(HttpStatus.BAD_REQUEST.value()).error(HttpStatus.BAD_REQUEST.getReasonPhrase()).timestamp(LocalDateTime.now().toString()).build();
        return new ResponseEntity<>(errorInfo,HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorInfo> handleValidationException(MethodArgumentNotValidException exception) {
        // Get the list of field errors from the exception
        List<FieldError> fieldErrors = exception.getBindingResult().getFieldErrors();

        // Create a list to hold the error details
       String errors = "";

        // Iterate over the field errors and extract the error messages
        for (FieldError fieldError : fieldErrors) {
            errors+=fieldError.getDefaultMessage()+",";
        }

        // Create an ErrorInfo object to hold the error details
        ErrorInfo errorInfo = ErrorInfo.builder()
                .status(HttpStatus.BAD_REQUEST.value())
                .error("Validation failed")
                .message(fieldErrors.get(0).getDefaultMessage())
                .timestamp(LocalDateTime.now().toString())
                .build();

        // Return a ResponseEntity with the ErrorInfo object and the appropriate status code
        return new ResponseEntity<>(errorInfo,HttpStatus.BAD_REQUEST);
    }

}