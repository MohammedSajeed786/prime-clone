package com.prime.gateway.jwt.service;

import com.prime.gateway.jwt.exception.TokenException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.function.Function;

@Service
public class JwtService {

    @Autowired
    UserDetailsServiceImpl userDetailsService;

//    @Autowired
//    Environment environment;

    @Value("${SECRET}")
    private String SECRET_KEY;



    public String extractUsername(String jwtToken) {
        return extractClaim(jwtToken,Claims::getSubject);
    }

    public Date extractExpiration(String jwtToken ){
        return  extractClaim(jwtToken,Claims::getExpiration);
    }

    private <T> T extractClaim(String jwtToken, Function<Claims,T> claimsResolver){

        Claims claims=extractAllClaims(jwtToken);

        return claimsResolver.apply(claims);

    }
    private Claims extractAllClaims(String jwtToken){
//        System.out.println(SECRET_KEY);
        try {
            return Jwts.parserBuilder().setSigningKey(getSignInKey()).build().parseClaimsJws(jwtToken).getBody();
        }catch (Exception e){

            throw new TokenException("invalid token",e);
        }
    }

    private Key getSignInKey() {
//        String SECRET_KEY=System.getenv("SECRET");
//        String SECRET=environment.getProperty("SECRET");
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(SECRET_KEY));
    }

    public Boolean isTokenValid(String jwtToken,String userId){
        if(!isTokenExpired(jwtToken) && isUserValid(userId)) return true;
        return false;
    }

    private boolean isUserValid(String userId) {
        if(userDetailsService.getUserByUserId(userId)!=null) return true;
        else throw new TokenException("invalid user");
    }

    private boolean isTokenExpired(String jwtToken) {
        if(extractExpiration(jwtToken).before(new Date())) {
            throw new TokenException("token expired");
        }
        return false;
    }
}
