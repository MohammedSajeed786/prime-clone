package com.prime.Cart.repository;

import com.prime.Cart.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem,Integer> {
    CartItem findByMovieId(Integer movieId);
}
