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
    private String orderId;
    private String paymentId;
    private String userId;
    private Date timestamp;
    private Integer price;
    @Enumerated(EnumType.STRING)
    private Status orderStatus;

    @OneToMany(cascade = CascadeType.ALL)
            @JoinColumn(name = "orderId",referencedColumnName = "orderId")
    private List<OrderItem> orderItemList;


    public static OrderDto convertEntityToDto(Order entity){
        return OrderDto.builder().orderId(entity.getOrderId()).price(entity.getPrice()).build();
    }

}
