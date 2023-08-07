package com.prime.movie.jwt.service;

import java.util.Date;
import java.util.Map;

public interface JwtService {


    public String generateToken(Map<String,Object> extraClaims, String userId, Long expiry);

    public String generateToken(String userId, Long expiry);

   public Boolean isTokenValid(String token);

   public Boolean isTokenExpired(String token);

   public Boolean isUserValid(String token);

    String extractUser(String jwtToken);

    Date extractExpiration(String jwtToken);
}

