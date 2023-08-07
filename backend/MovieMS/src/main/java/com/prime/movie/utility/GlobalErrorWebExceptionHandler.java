package com.prime.movie.utility;//package com.prime.movie.utility;
//
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.prime.movie.exception.MovieException;
//import com.prime.movie.jwt.exception.TokenException;
//import org.springframework.core.annotation.Order;
//import org.springframework.core.io.buffer.DataBuffer;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.MediaType;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Component;
//import org.springframework.validation.FieldError;
//import org.springframework.web.bind.MethodArgumentNotValidException;
//import org.springframework.web.bind.annotation.ExceptionHandler;
//import org.springframework.web.bind.annotation.RestControllerAdvice;
//import org.springframework.web.server.ServerWebExchange;
//import org.springframework.web.server.WebExceptionHandler;
//import reactor.core.publisher.Mono;
//
//import java.time.LocalDateTime;
//import java.util.List;
////
////@RestControllerAdvice
////public class GlobalExceptionHandler {
////
////
////
////    @ExceptionHandler({MovieException.class, TokenException.class})
////    public ResponseEntity<ErrorInfo> movieExceptionHandler(Exception exception){
//////        System.out.println("inside handler");
////        ErrorInfo errorInfo=ErrorInfo.builder().message(exception.getMessage())
////                .status(HttpStatus.BAD_REQUEST.value()).error(HttpStatus.BAD_REQUEST.getReasonPhrase()).timestamp(LocalDateTime.now().toString()).build();
////        return new ResponseEntity<>(errorInfo,HttpStatus.BAD_REQUEST);
////    }
////    @ExceptionHandler({RuntimeException.class})
////    public ResponseEntity<ErrorInfo> runtimeExceptionHandler(Exception exception){
////        System.out.println("inside handler "+exception);
////        ErrorInfo errorInfo=ErrorInfo.builder().message(exception.getMessage())
////                .status(HttpStatus.BAD_REQUEST.value()).error(HttpStatus.BAD_REQUEST.getReasonPhrase()).timestamp(LocalDateTime.now().toString()).build();
////        return new ResponseEntity<>(errorInfo,HttpStatus.INTERNAL_SERVER_ERROR);
////    }
////
////    @ExceptionHandler(MethodArgumentNotValidException.class)
////    public ResponseEntity<ErrorInfo> handleValidationException(MethodArgumentNotValidException exception) {
////        // Get the list of field errors from the exception
////        List<FieldError> fieldErrors = exception.getBindingResult().getFieldErrors();
////
////        // Create a list to hold the error details
////       String errors = "";
////
////        // Iterate over the field errors and extract the error messages
////        for (FieldError fieldError : fieldErrors) {
////            errors+=fieldError.getDefaultMessage()+",";
////        }
////
////        // Create an ErrorInfo object to hold the error details
////        ErrorInfo errorInfo = ErrorInfo.builder()
////                .status(HttpStatus.BAD_REQUEST.value())
////                .error("Validation failed")
////                .message(fieldErrors.get(0).getDefaultMessage())
////                .timestamp(LocalDateTime.now().toString())
////                .build();
////
////        // Return a ResponseEntity with the ErrorInfo object and the appropriate status code
////        return new ResponseEntity<>(errorInfo,HttpStatus.BAD_REQUEST);
////    }
////
////}

import org.springframework.boot.autoconfigure.web.WebProperties;
import org.springframework.boot.autoconfigure.web.reactive.error.AbstractErrorWebExceptionHandler;
import org.springframework.boot.web.error.ErrorAttributeOptions;
import org.springframework.boot.web.reactive.error.ErrorAttributes;
import org.springframework.context.ApplicationContext;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.codec.ServerCodecConfigurer;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.server.*;
import reactor.core.publisher.Mono;

import java.util.Map;

@Component
@Order(-2)
public class GlobalErrorWebExceptionHandler extends AbstractErrorWebExceptionHandler {

    public GlobalErrorWebExceptionHandler(GlobalErrorAttributes globalErrorAttributes, ApplicationContext applicationContext,
                                          ServerCodecConfigurer serverCodecConfigurer) {
        super(globalErrorAttributes, new WebProperties.Resources(), applicationContext);
        super.setMessageWriters(serverCodecConfigurer.getWriters());
        super.setMessageReaders(serverCodecConfigurer.getReaders());
    }

    @Override
    protected RouterFunction<ServerResponse> getRoutingFunction(ErrorAttributes errorAttributes) {
        return RouterFunctions.route(RequestPredicates.all(), this::renderErrorResponse);
    }

    private Mono<ServerResponse> renderErrorResponse(ServerRequest request) {

        final Map<String, Object> errorPropertiesMap = getErrorAttributes(request, ErrorAttributeOptions.defaults());

        int statusCode = Integer.parseInt(errorPropertiesMap.get(ErrorAttributesKey.CODE.getKey()).toString());
        return ServerResponse.status(HttpStatus.valueOf(statusCode))
                .contentType(MediaType.APPLICATION_JSON)
                .body(BodyInserters.fromValue(errorPropertiesMap));
    }
}