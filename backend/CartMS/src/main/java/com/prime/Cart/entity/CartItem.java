package com.prime.Cart.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
//@ToString
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer cartItemId;
    Integer movieId;
    @ManyToOne()
    @JoinColumn(name = "cartId", referencedColumnName = "cartId")
    Cart cart;
}
