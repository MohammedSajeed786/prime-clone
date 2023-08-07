package com.prime.Cart.dto;

import com.prime.Cart.entity.CartItem;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartDto {
    Integer cartId;
    List<CartItemDto> cart;
}