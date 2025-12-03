package com.api.TechSafraApi.controller;

import com.api.TechSafraApi.dtos.MaquinarioDto;
import com.api.TechSafraApi.model.MaquinarioModel;
import com.api.TechSafraApi.service.MaquinarioService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/maquinarios")
@CrossOrigin(origins = "*") // Permite acesso do Frontend
public class MaquinarioController {

    private final MaquinarioService service;

    public MaquinarioController(MaquinarioService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<MaquinarioModel>> listar() {
        return ResponseEntity.ok(service.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MaquinarioModel> buscar(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<MaquinarioModel> salvar(@RequestBody @Valid MaquinarioDto dto) {
        MaquinarioModel novo = service.salvar(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(novo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MaquinarioModel> atualizar(@PathVariable Long id, @RequestBody @Valid MaquinarioDto dto) {
        MaquinarioModel atualizado = service.atualizar(id, dto);
        return ResponseEntity.ok(atualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}