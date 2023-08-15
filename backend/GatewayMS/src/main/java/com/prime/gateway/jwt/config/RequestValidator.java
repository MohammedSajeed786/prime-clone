package com.prime.gateway.jwt.config;

import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.function.Predicate;

@Component
public class RequestValidator {

    public static final List<Integer> openPorts = List.of(
            8001,
            8002,
            8003
    );

    public Predicate<ServerHttpRequest> isSecured =
            request -> {

                String remoteHost = request.getRemoteAddress().getHostString();
//                int remotePort = request.getLocalAddress().getPort();
//                System.out.println(remoteHost);

//                System.out.println(request.getPath());
//                System.out.println(request.getHeaders().getFirst("origin"));
//                System.out.println(request.getLocalAddress().getPort());
//                String remoteHost=request.getHeaders().getFirst("origin").toString().substring(7,16);
                String port = null;
                String origin = request.getHeaders().getFirst("origin");
                if (origin != null) port = origin.substring(17);
//                System.out.println(port);
//                System.out.println(remoteHost +" "+port);


//                System.out.println(remoteHost.equals("127.0.0.1") && openPorts.contains(remotePort));
                // Check if the request is coming from localhost and the port is allowed
                return (remoteHost.equals("0:0:0:0:0:0:0:1") && (port==null || port.equals("4200")));
            };

}
