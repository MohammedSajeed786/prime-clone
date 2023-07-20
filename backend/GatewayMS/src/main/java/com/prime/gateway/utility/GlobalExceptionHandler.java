package com.prime.gateway.utility;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.prime.gateway.jwt.exception.TokenException;
import org.springframework.core.annotation.Order;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebExceptionHandler;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;

@Component
@Order(-1)
public class GlobalExceptionHandler implements WebExceptionHandler {

    @Override
    public Mono<Void> handle(ServerWebExchange exchange, Throwable ex) {
        if (ex instanceof TokenException) {
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);

            ErrorInfo errorInfo = new ErrorInfo();
            errorInfo.setStatus(HttpStatus.UNAUTHORIZED.value());
            errorInfo.setError(HttpStatus.UNAUTHORIZED.getReasonPhrase());
            errorInfo.setMessage(ex.getMessage());
            errorInfo.setTimestamp(LocalDateTime.now().toString());

            byte[] errorMessageBytes = convertErrorInfoToJsonBytes(errorInfo);
            DataBuffer buffer = exchange.getResponse().bufferFactory().wrap(errorMessageBytes);
            exchange.getResponse().getHeaders().setContentLength(errorMessageBytes.length);
            exchange.getResponse().getHeaders().setContentType(MediaType.APPLICATION_JSON);
            return exchange.getResponse().writeWith(Mono.just(buffer));
        }
        return Mono.error(ex);
    }

    private byte[] convertErrorInfoToJsonBytes(ErrorInfo errorInfo) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.writeValueAsBytes(errorInfo);
        } catch (JsonProcessingException e) {
            // Handle the exception if necessary
            return new byte[0];
        }
    }
}
