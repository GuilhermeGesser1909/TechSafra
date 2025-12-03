package com.api.TechSafraApi.controller;

import com.api.TechSafraApi.model.AtividadeModel;
import com.api.TechSafraApi.service.AtividadeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/atividades")
@CrossOrigin(origins = "*")
public class AtividadeController {

    private final AtividadeService service;

    public AtividadeController(AtividadeService service) {
        this.service = service;
    }

    @GetMapping("/{usuarioId}")
    public ResponseEntity<List<AtividadeModel>> listarRecentes(@PathVariable Long usuarioId) {
        return ResponseEntity.ok(service.listarRecentes(usuarioId));
    }
}