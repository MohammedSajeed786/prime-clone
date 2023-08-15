package com.prime.Order.entity;


import com.prime.Order.dto.OrderDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;


@Entity
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "orders")
public class Order {

    @Id
    String orderId;
    String paymentId;
    String userId;
    Date timestamp;
    Integer price;
    @Enumerated(EnumType.STRING)
    Status orderStatus;

    @OneToMany
            @JoinColumn(name = "orderId",referencedColumnName = "orderId")
    List<OrderItem> orderItemList;


    public static OrderDto convertEntityToDto(Order entity){
        return OrderDto.builder().orderId(entity.getOrderId()).price(entity.getPrice()).build();
    }

}
