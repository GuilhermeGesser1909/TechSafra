package com.api.TechSafraApi.controller;

import com.api.TechSafraApi.dtos.SafraRequestDto;
import com.api.TechSafraApi.dtos.SafraResponseDto;
import com.api.TechSafraApi.service.SafraService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/safras")
public class SafraController {

    private final SafraService service;

    public SafraController(SafraService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<SafraResponseDto> criar(@RequestBody SafraRequestDto dto) {
        SafraResponseDto criado = service.criar(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(criado);
    }

    @GetMapping
    public ResponseEntity<List<SafraResponseDto>> listar() {
        List<SafraResponseDto> lista = service.listarTodos();
        return ResponseEntity.ok(lista);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SafraResponseDto> buscar(@PathVariable Long id) {
        SafraResponseDto dto = service.buscarPorId(id);
        return ResponseEntity.ok(dto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SafraResponseDto> atualizar(@PathVariable Long id,
                                                      @RequestBody SafraRequestDto dto) {
        SafraResponseDto atualizado = service.atualizar(id, dto);
        return ResponseEntity.ok(atualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
