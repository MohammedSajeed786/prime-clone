package com.prime.Order.service;

import com.prime.Order.dto.OrderDto;
import com.prime.Order.dto.PaymentDto;
import com.prime.Order.dto.VaultItemDto;
import com.razorpay.RazorpayException;

import java.util.List;

public interface OrderService {

    OrderDto createOrder(String userId, Double price) throws RazorpayException;

    List<VaultItemDto> completeOrder(String authorizationHeader, PaymentDto paymentDto);
}
