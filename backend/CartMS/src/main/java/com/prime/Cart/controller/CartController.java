package com.prime.Cart.controller;


import com.prime.Cart.dto.CartDto;
import com.prime.Cart.dto.CartItemDto;
import com.prime.Cart.service.CartService;
import com.prime.Cart.utility.CartResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    CartService cartService;

    @PostMapping("/add/{movieId}")
    public ResponseEntity<CartResponse<CartItemDto>> addToCart(@RequestHeader("Authorization") String authorizationHeader, @RequestHeader("userId") String userId, @PathVariable Integer movieId) {
        CartItemDto cartItemDto = cartService.addToCart(authorizationHeader,userId, movieId);
        return new ResponseEntity<>(CartResponse.<CartItemDto>builder().status(201).message("movie added to cart successfully").data(cartItemDto).build(), HttpStatus.CREATED);
    }

    @DeleteMapping("/remove/{cartItemId}")
    public ResponseEntity<CartResponse> removeFromCart(@PathVariable Integer cartItemId) {
        cartService.removeFromCart(cartItemId);
        return new ResponseEntity<>(CartResponse.builder().status(200).message("movie removed from cart successfully").build(), HttpStatus.CREATED);
    }


    @GetMapping("/all")
    public ResponseEntity<CartResponse<CartDto>> getCart(@RequestHeader("Authorization") String authorizationHeader,@RequestHeader("userId") String userId) {

        CartDto cartDto = cartService.getCart(authorizationHeader,userId);
        return new ResponseEntity<>(CartResponse.<CartDto>builder().status(200).message("cart fetched successfully").data(cartDto).build(), HttpStatus.OK);
    }
}
