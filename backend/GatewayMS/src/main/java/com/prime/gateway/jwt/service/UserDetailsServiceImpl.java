package com.prime.gateway.jwt.service;


import com.prime.gateway.dto.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


@Service
public class UserDetailsServiceImpl  {


    @Autowired
    RestTemplate restTemplate;

    private final String URL="http://localhost:8001/auth/getUser/";
    public User getUserByUserId(String userId) {
      User user=  restTemplate.getForObject(this.URL+userId,User.class);
      return user;

    }



}
