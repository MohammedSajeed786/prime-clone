package com.prime.Order.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentDto {
    String orderId;
    String paymentId;
    List<Integer> movieIdList;
    List<Integer> cartItemIdList;
}
