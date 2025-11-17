package com.api.TechSafraApi.controller;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

	@RestController
	@RequestMapping("/api")
	public class NewsController {

		@CrossOrigin(origins = "http://localhost:3000")
	    @GetMapping("/agro-news")
	    public ResponseEntity<?> pegarNoticias() {

	        String apiKey = "872f569a10af4e98a36446ae0cd680b5";
	        String url = "https://newsapi.org/v2/everything?q=agro+agricultura&language=pt&sortBy=publishedAt&apiKey=" + apiKey;

	        try {
	            HttpClient client = HttpClient.newHttpClient();
	            HttpRequest request = HttpRequest.newBuilder()
	                    .uri(URI.create(url))
	                    .GET()
	                    .build();

	            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
	            return ResponseEntity.ok(response.body());

	        } catch (Exception e) {
	            return ResponseEntity.status(500).body("Erro ao consultar NewsAPI");
	        }
	    }
	}