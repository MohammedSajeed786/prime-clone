package com.prime.Cart.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Builder
@AllArgsConstructor
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer cartId;

    @Column(unique = true)
    private String userId;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(referencedColumnName = "cartId", name = "cartId")
    private List<CartItem> cartItemList;

    public Cart() {
        cartItemList = new ArrayList<>();
    }

//    public static CartDto convertEntityToDto(Cart entity){
//        return CartDto.builder().cartId(entity.getCartId()).userId(entity.getUserId()).cartItemList(entity.getCartItemList()).build();
//    }


}
