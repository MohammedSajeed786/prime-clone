package com.prime.movie.jwt.service;

import com.prime.movie.jwt.exception.TokenException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtServiceImpl implements JwtService {


    @Value("${SECRET}")
    private String SECRET_KEY;


    @Autowired
    UserDetailsServiceImpl userDetailsService;

    @Override
    public String generateToken(Map<String, Object> extraClaims, String userId, Long expiry) {
        return Jwts.builder().setClaims(extraClaims).setSubject(userId).setIssuedAt(new Date(System.currentTimeMillis())).setExpiration(new Date(System.currentTimeMillis()+expiry)).signWith(getSignInKey(), SignatureAlgorithm.HS256).compact();
    }

    @Override
    public String generateToken(String userId, Long expiry) {
        return generateToken(new HashMap<>(),userId,expiry);
    }

    @Override
    public Boolean isTokenValid(String token) {
        if(!isTokenExpired(token) && isUserValid(extractUser(token))) return true;
        else throw new TokenException("invalid token");
    }

    @Override
    public Boolean isTokenExpired(String token) {
        if(new Date().before(extractExpiration(token))) throw new TokenException("token expired");
        return false;
    }

    @Override
    public Boolean isUserValid(String userId) {
        if(userDetailsService.getUserByUserId(userId)!=null) return true;
        else throw new TokenException("invalid user");
    }

    private Key getSignInKey() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(SECRET_KEY));
    }


    @Override
    public String extractUser(String jwtToken) {
        return extractClaim(jwtToken, Claims::getSubject);
    }

    @Override
    public Date extractExpiration(String jwtToken ){
        return  extractClaim(jwtToken,Claims::getExpiration);
    }

    private <T> T extractClaim(String jwtToken, Function<Claims,T> claimsResolver){

        Claims claims=extractAllClaims(jwtToken);

        return claimsResolver.apply(claims);

    }
    private Claims extractAllClaims(String jwtToken){
        try {
            return Jwts.parserBuilder().setSigningKey(getSignInKey()).build().parseClaimsJws(jwtToken).getBody();
        }catch (Exception e){

            throw new TokenException("invalid token");
        }
    }

}
