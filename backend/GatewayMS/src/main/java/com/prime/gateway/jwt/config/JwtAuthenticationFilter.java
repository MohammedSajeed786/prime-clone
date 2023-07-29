package com.prime.gateway.jwt.config;//package com.prime.gateway.jwt.config;

import com.prime.gateway.jwt.exception.TokenException;
import com.prime.gateway.jwt.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.stereotype.Component;

@Component
public class JwtAuthenticationFilter extends AbstractGatewayFilterFactory<JwtAuthenticationFilter.Config> {

    @Autowired
    RouteValidator routeValidator;
    @Autowired
    private JwtService jwtService;

    public JwtAuthenticationFilter() {
        super(Config.class);
    }


    @Override
    public GatewayFilter apply(Config config) {
        return ((exchange, chain) -> {
            if (routeValidator.isSecured.test(exchange.getRequest())) {

                // Getting data from header named Authorization
                String authHeader = exchange.getRequest().getHeaders().getFirst("Authorization");

                // If Authorization header is not present or it does not start with Bearer, reject the request
                if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                    throw new TokenException("no token found");
                }

                String jwtToken = authHeader.substring(7); // Pick the token
                String userId = jwtService.extractUsername(jwtToken); // Extract user_id from token

                if (userId != null) {
                    // Code block executed if userId is NOT null
                    if (jwtService.isTokenValid(jwtToken, userId)) {
                        // If token is valid
                        exchange.getRequest().mutate()
                                .header("userId", userId)
                                .build();

                        return chain.filter(exchange);
                    }

                } else {
                    throw new TokenException("Invalid token");
                }


            }
            return chain.filter(exchange);
        });
    }

    public static class Config {

    }

}
