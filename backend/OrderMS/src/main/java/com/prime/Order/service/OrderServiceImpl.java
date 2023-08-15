package com.prime.Order.service;

import com.prime.Order.dto.OrderDto;
import com.prime.Order.dto.PaymentDto;
import com.prime.Order.dto.VaultItemDto;
import com.prime.Order.entity.Order;
import com.prime.Order.entity.OrderItem;
import com.prime.Order.entity.Status;
import com.prime.Order.exception.OrderException;
import com.prime.Order.repository.OrderRepository;
import com.prime.Order.utility.OrderResponse;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    @Value("${raz_key_id}")
    String key_id;

    @Value("${raz_key_secret}")
    String key_secret;

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    RestTemplate restTemplate;

    @Override
    public OrderDto createOrder(String userId, Double price) throws RazorpayException {

        long ordersCount = orderRepository.count();
        RazorpayClient razorpay = new RazorpayClient(key_id, key_secret);

        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", price * 100);
        orderRequest.put("currency", "INR");
        orderRequest.put("receipt", "receipt" + ordersCount + 1);
        com.razorpay.Order order = razorpay.orders.create(orderRequest);

        String orderId = order.get("id");
        Integer orderPrice = order.get("amount_due");
        Date timestamp = order.get("created_at");


        return Order.convertEntityToDto(orderRepository.save(Order.builder().orderId(orderId).price(orderPrice).userId(userId).timestamp(timestamp).orderStatus(Status.CREATED).build()));

    }

    @Override
    public List<VaultItemDto> completeOrder(String authorizationHeader, PaymentDto paymentDto) {
        Optional<Order> optionalOrder = orderRepository.findById(paymentDto.getOrderId());
        if (!optionalOrder.isPresent()) {
            throw new OrderException("invalid order id");
        }

        //changing status of order, along with payment id and orderItemList
        Order order = optionalOrder.get();
        order.setOrderStatus(Status.COMPLETED);
        order.setPaymentId(paymentDto.getPaymentId());

        List<OrderItem> orderItemList = paymentDto.getMovieIdList().stream().map((movieId) -> OrderItem.builder().movieId(movieId).build()).collect(Collectors.toList());
        order.setOrderItemList(orderItemList);
        orderRepository.save(order);


        //removing movies from the cart
        String cartUrl = "http://GatewayMS/cart/remove/";

        HttpEntity<HttpHeaders> httpEntity = setHeaders(authorizationHeader);
        ParameterizedTypeReference<OrderResponse<String>> cartResponseType = new ParameterizedTypeReference<OrderResponse<String>>() {
        };


        paymentDto.getCartItemIdList().stream().forEach((cartItemId) -> {
            restTemplate.exchange(cartUrl + cartItemId, HttpMethod.DELETE, httpEntity, cartResponseType);
        });


        //adding movieIds to the vault
        String vaultUrl = "http://GatewayMS/vault/add/";
        List<VaultItemDto> vaultItemDtos=new ArrayList<>();
        ParameterizedTypeReference<OrderResponse<VaultItemDto>> responseType =
                new ParameterizedTypeReference<OrderResponse<VaultItemDto>>() {
                };
        paymentDto.getMovieIdList().stream().forEach((movieId) -> {
          vaultItemDtos.add(restTemplate.exchange(vaultUrl + movieId, HttpMethod.POST,httpEntity,responseType).getBody().getData());
        });

          return vaultItemDtos;
    }

    public HttpEntity<HttpHeaders> setHeaders(String authorizationHeader) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", authorizationHeader);
        return new HttpEntity<>(headers);

    }
}
