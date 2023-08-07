package com.prime.Cart.repository;

import com.prime.Cart.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface CartRepository extends JpaRepository<Cart,Integer> {
    Optional<Cart> findByUserId(String userId);
}
