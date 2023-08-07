package com.prime.movie.jwt.service;



import com.prime.movie.dto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


@Service
public class UserDetailsServiceImpl {


    @Autowired
    RestTemplate restTemplate;

    private final String URL="http://localhost:8001/auth/getUser/";
    public UserDto getUserByUserId(String userId) {
      UserDto user=  restTemplate.getForObject(this.URL+userId,UserDto.class);
      return user;

    }



}
