package com.prime.Cart.service;

import com.prime.Cart.dto.CartDto;
import com.prime.Cart.dto.CartItemDto;
import com.prime.Cart.dto.MovieSummaryDto;
import com.prime.Cart.entity.Cart;
import com.prime.Cart.entity.CartItem;
import com.prime.Cart.exception.CartException;
import com.prime.Cart.repository.CartItemRepository;
import com.prime.Cart.repository.CartRepository;
import com.prime.Cart.utility.MovieResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
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

//    @Value("${gatewayUri}")
//    String gatewayUri;

    @Override
    public CartItemDto addToCart(String authorizationHeader, String userId, Integer movieId) {

        Optional<Cart> optionalCart = cartRepository.findByUserId(userId);
        Cart cart;
        CartItem cartItem = CartItem.builder().movieId(movieId).build();
        if (optionalCart.isPresent()) {
            cart = optionalCart.get();
        } else {
            cart = new Cart();
            cart.setUserId(userId);
        }

        List<CartItem> cartItemList = cart.getCartItemList();
        boolean hasItem = cartItemList.stream().anyMatch((c) -> c.getMovieId().equals(movieId));
        if (hasItem) throw new CartException("movie already present in the cart");

        cart.getCartItemList().add(cartItem);
        cartRepository.save(cart);

        cartItem = cartItemRepository.findByMovieId(movieId);
        MovieSummaryDto movieSummaryDto = fetchMovieSummary(authorizationHeader,movieId);
        return CartItemDto.builder().cartItemId(cartItem.getCartItemId()).movie(movieSummaryDto).build();
    }


    public MovieSummaryDto fetchMovieSummary(String authorizationHeader,Integer movieId) {


        String gatewayUri="http://GatewayMS";
        String url = gatewayUri + "/movie/movieSummary/" + movieId;
        ParameterizedTypeReference<MovieResponse<MovieSummaryDto>> responseType =
                new ParameterizedTypeReference<MovieResponse<MovieSummaryDto>>() {
                };


        HttpEntity<HttpHeaders> httpEntity=setHeaders(authorizationHeader);

        ResponseEntity<MovieResponse<MovieSummaryDto>> response =
                restTemplate.exchange(url, HttpMethod.GET, httpEntity, responseType);

        // Get the body of the response and then the data
        MovieResponse<MovieSummaryDto> movieResponse = response.getBody();
        MovieSummaryDto movieSummaryDto = movieResponse.getData();


        return movieSummaryDto;

    }

    public HttpEntity<HttpHeaders> setHeaders(String authorizationHeader){
        HttpHeaders headers=new HttpHeaders();
        headers.set("Authorization",authorizationHeader);
        return new HttpEntity<>(headers);

    }

    @Override
    public void removeFromCart(Integer cartItemId) {
        if(!cartItemRepository.findById(cartItemId).isPresent()) throw new CartException("movie does not exist in the cart");
        cartItemRepository.deleteById(cartItemId);
    }

    @Override
    public CartDto getCart(String authorizationHeader, String userId) {
        Optional<Cart> optionalCart = cartRepository.findByUserId(userId);
        Cart cart;
        if (optionalCart.isPresent()) {
            cart = optionalCart.get();
        } else {
            cart = new Cart();

        }

        List<CartItemDto> cartItemDtoList = new ArrayList<>();
        cart.getCartItemList().stream().forEach((cartItem -> {
            cartItemDtoList.add(CartItemDto.builder().cartItemId(cartItem.getCartItemId()).movie(fetchMovieSummary(authorizationHeader,cartItem.getMovieId())).build());

        }));

        return CartDto.builder().cartId(cart.getCartId()).cart(cartItemDtoList).build();
    }
}
