package com.prime.Cart.service;

import com.prime.Cart.dto.CartDto;
import com.prime.Cart.dto.CartItemDto;
import com.prime.Cart.dto.MovieSummaryDto;
import com.prime.Cart.entity.Cart;
import com.prime.Cart.entity.CartItem;
import com.prime.Cart.repository.CartItemRepository;
import com.prime.Cart.repository.CartRepository;
import com.prime.Cart.utility.MovieResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    CartRepository cartRepository;


    @Autowired
    CartItemRepository cartItemRepository;

    @Autowired
    RestTemplate restTemplate;

    @Value("${gatewayUri}")
    String gatewayUri;

    @Override
    public CartItemDto addToCart(String userId, Integer movieId) {

        Optional<Cart> optionalCart = cartRepository.findByUserId(userId);
        Cart cart;
        CartItem cartItem = CartItem.builder().movieId(movieId).build();
        if (optionalCart.isPresent()) {
            cart = optionalCart.get();
        } else {
            cart = Cart.builder().userId(userId).build();
            cart = cartRepository.save(cart);
        }
        cartItem.setCart(cart);

        cartItem = cartItemRepository.save(cartItem);

        MovieSummaryDto movieSummaryDto = fetchMovieSummary(movieId);
        return CartItemDto.builder().cartItemId(cartItem.getCartItemId()).movie(movieSummaryDto).build();
    }


    public MovieSummaryDto fetchMovieSummary(Integer movieId) {


        String url = gatewayUri + "/movie/movieSummary/" + movieId;
        ParameterizedTypeReference<MovieResponse<MovieSummaryDto>> responseType =
                new ParameterizedTypeReference<MovieResponse<MovieSummaryDto>>() {
                };

        ResponseEntity<MovieResponse<MovieSummaryDto>> response =
                restTemplate.exchange(url, HttpMethod.GET, null, responseType);

// Get the body of the response and then the data
        MovieResponse<MovieSummaryDto> movieResponse = response.getBody();
        MovieSummaryDto movieSummaryDto = movieResponse.getData();


        return movieSummaryDto;

    }

    @Override
    public void removeFromCart(Integer cartItemId) {
        cartItemRepository.deleteById(cartItemId);
    }

    @Override
    public CartDto getCart(String userId) {
        Optional<Cart> optionalCart = cartRepository.findByUserId(userId);
        Cart cart;
        if (optionalCart.isPresent()) {
            cart = optionalCart.get();
        } else {
            cart = new Cart();

        }
        List<CartItemDto> cartItemDtoList = new ArrayList<>();
        cart.getCartItemList().stream().forEach((cartItem -> {
            cartItemDtoList.add(CartItemDto.builder().cartItemId(cartItem.getCartItemId()).movie(fetchMovieSummary(cartItem.getMovieId())).build());

        }));

        return CartDto.builder().cartId(cart.getCartId()).cart(cartItemDtoList).build();
    }
}
