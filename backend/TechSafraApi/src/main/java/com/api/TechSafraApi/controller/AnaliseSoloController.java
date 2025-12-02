package com.api.TechSafraApi.controller;

import com.api.TechSafraApi.dtos.AnaliseSoloDto;
import com.api.TechSafraApi.model.AnaliseSoloModel;
import com.api.TechSafraApi.service.AnaliseSoloService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/analises-solo")
@CrossOrigin(origins = "*") // Importante para o frontend aceder
public class AnaliseSoloController {

    private final AnaliseSoloService service;

    public AnaliseSoloController(AnaliseSoloService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<AnaliseSoloModel> criarAnalise(@RequestBody @Valid AnaliseSoloDto dto) {
        return ResponseEntity.ok(service.criarAnalise(dto));
    }

    @GetMapping
    public ResponseEntity<List<AnaliseSoloModel>> listarAnalises() {
        return ResponseEntity.ok(service.listarAnalises());
    }

    @PutMapping("/{id}")
    public ResponseEntity<AnaliseSoloModel> atualizarAnalise(
            @PathVariable UUID id,
            @RequestBody @Valid AnaliseSoloDto dto) {
        return service.atualizarAnalise(id, dto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> apagarAnalise(@PathVariable UUID id) {
        service.apagarAnalise(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<AnaliseSoloModel> buscarPorId(@PathVariable UUID id) {
        return service.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}