package com.prime.Cart.service;

import com.prime.Cart.dto.CartDto;
import com.prime.Cart.dto.CartItemDto;

public interface CartService {

    public CartItemDto addToCart(String authorizationHeader, String userid, Integer movieId);

    public void removeFromCart(Integer cartItemId);


    CartDto getCart(String authorizationHeader, String userId);
}
