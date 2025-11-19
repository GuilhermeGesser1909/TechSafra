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

    //  Criar análise
    @PostMapping
    public ResponseEntity<AnaliseSoloModel> criarAnalise(@RequestBody AnaliseSoloModel analise) {
        return ResponseEntity.ok(service.criarAnalise(analise));
    }

    //  Listar todas as análises
    @GetMapping
    public ResponseEntity<List<AnaliseSoloModel>> listarAnalises() {
        return ResponseEntity.ok(service.listarAnalises());
    }

    //  Atualizar uma análise por ID
    @PutMapping("/{id}")
    public ResponseEntity<AnaliseSoloModel> atualizarAnalise(
            @PathVariable UUID id,
            @RequestBody AnaliseSoloModel analiseAtualizada) {
        return service.atualizarAnalise(id, analiseAtualizada)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    //  Apagar uma análise por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> apagarAnalise(@PathVariable UUID id) {
        service.apagarAnalise(id);
        return ResponseEntity.noContent().build();
    }
}
