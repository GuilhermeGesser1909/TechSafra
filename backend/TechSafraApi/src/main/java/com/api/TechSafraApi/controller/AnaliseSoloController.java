package com.api.TechSafraApi.controller;

import com.api.TechSafraApi.model.AnaliseSoloModel;
import com.api.TechSafraApi.service.AnaliseSoloService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/analises-solo")
public class AnaliseSoloController {

    private final AnaliseSoloService service;

    public AnaliseSoloController(AnaliseSoloService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<AnaliseSoloModel> criarAnalise(@RequestBody AnaliseSoloModel analise) {
        return ResponseEntity.ok(service.criarAnalise(analise));
    }

    @GetMapping
    public ResponseEntity<List<AnaliseSoloModel>> listarAnalises() {
        return ResponseEntity.ok(service.listarAnalises());
    }

    @PutMapping("/{id}")
    public ResponseEntity<AnaliseSoloModel> atualizarAnalise(
            @PathVariable UUID id,
            @RequestBody AnaliseSoloModel analiseAtualizada) {
        return service.atualizarAnalise(id, analiseAtualizada)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> apagarAnalise(@PathVariable UUID id) {
        service.apagarAnalise(id);
        return ResponseEntity.noContent().build();
    }
}
