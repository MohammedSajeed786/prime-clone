package com.prime.gateway.jwt.exception;

public class TokenException extends RuntimeException {
    public TokenException(String message){
        super(message);
    }
    public TokenException(String message, Throwable cause) {
        super(message, cause);
    }
}
