package com.prime.movie.jwt.service;


import com.prime.movie.dto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


@Service
public class UserDetailsServiceImpl {


    @Autowired
    RestTemplate restTemplate;

    public UserDto getUserByUserId(String userId) {
        String URL = "http://localhost:8000/auth/getUser/";

        try {

            return restTemplate.getForObject(URL + userId, UserDto.class);
        } catch (Exception e) {
//           System.out.println(e.getMessage());
        }
        return null;
    }


}
