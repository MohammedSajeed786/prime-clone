package com.prime.Cart.entity;

import com.prime.Cart.dto.CartDto;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
//@Data
@Builder
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer cartId;

    @Column(unique = true)
    String userId;

    @OneToMany(mappedBy = "cart",cascade = CascadeType.ALL)
    List<CartItem> cartItemList;

    public Cart(){
        cartItemList=new ArrayList<>();
    }

//    public static CartDto convertEntityToDto(Cart entity){
//        return CartDto.builder().cartId(entity.getCartId()).userId(entity.getUserId()).cartItemList(entity.getCartItemList()).build();
//    }


}
