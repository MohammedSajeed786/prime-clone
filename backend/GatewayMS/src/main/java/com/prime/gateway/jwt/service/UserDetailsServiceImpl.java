package com.prime.gateway.jwt.service;


import com.prime.gateway.dto.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


@Service
public class UserDetailsServiceImpl {


    @Autowired
    RestTemplate restTemplate;


    public User getUserByUserId(String userId) {
        String URL = "http://localhost:8001/auth/getUser/";
        User user = restTemplate.getForObject(URL + userId, User.class);
        return user;

    }


}
