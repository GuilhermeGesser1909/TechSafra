package com.api.TechSafraApi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class TechSafraApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(TechSafraApiApplication.class, args);
    }

    @GetMapping("/")
    public String index() {
        return "🌾 TechSafra API funcionando!";
    }
}
