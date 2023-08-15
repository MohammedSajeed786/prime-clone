package com.prime.Order.controller;


import com.prime.Order.dto.MovieSummaryDto;
import com.prime.Order.dto.OrderDto;
import com.prime.Order.dto.PaymentDto;
import com.prime.Order.dto.VaultItemDto;
import com.prime.Order.service.OrderService;
import com.prime.Order.utility.OrderResponse;
import com.razorpay.RazorpayException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/order")
public class OrderController {

    @Autowired
    OrderService orderService;

    @PostMapping(value = "/create/{price}")
    public ResponseEntity<OrderResponse> createOrder(@RequestHeader("userId") String userId, @PathVariable Double price) throws RazorpayException {
        OrderDto orderDto = orderService.createOrder(userId, price);
        return new ResponseEntity<>(OrderResponse.builder().status(201).message("order created successfully").data(orderDto).build(), HttpStatus.CREATED);
    }

    @PostMapping(value = "/complete")
    public ResponseEntity<OrderResponse> completeOrder(@RequestHeader("Authorization") String authorizationHeader, @RequestBody PaymentDto paymentDto) {
        List<VaultItemDto> vaultItemDtoList=orderService.completeOrder(authorizationHeader,paymentDto);
        return new ResponseEntity<>(OrderResponse.<List<VaultItemDto>>builder().status(200).message("order completed successfully").data(vaultItemDtoList).build(), HttpStatus.CREATED);

    }


}
