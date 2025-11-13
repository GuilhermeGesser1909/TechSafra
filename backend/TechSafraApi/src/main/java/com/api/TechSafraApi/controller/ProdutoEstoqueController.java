package com.api.TechSafraApi.controller;

import com.api.TechSafraApi.dtos.ProdutoEstoqueDto;
import com.api.TechSafraApi.model.ProdutoEstoqueModel;
import com.api.TechSafraApi.service.ProdutoEstoqueService;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/produtos-estoque")
@CrossOrigin(origins = "*")
public class ProdutoEstoqueController {

    private final ProdutoEstoqueService service;

    public ProdutoEstoqueController(ProdutoEstoqueService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<ProdutoEstoqueModel>> listar() {
        return ResponseEntity.ok(service.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProdutoEstoqueModel> buscar(@PathVariable Long id) {
        ProdutoEstoqueModel produto = service.buscarPorId(id);
        return ResponseEntity.ok(produto);
    }

    @PostMapping
    public ResponseEntity<ProdutoEstoqueModel> salvar(@RequestBody @Valid ProdutoEstoqueDto dto) {
        ProdutoEstoqueModel novo = service.salvar(dto);
        return ResponseEntity.ok(novo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProdutoEstoqueModel> atualizar(
            @PathVariable Long id,
            @RequestBody @Valid ProdutoEstoqueDto dto) {
        ProdutoEstoqueModel atualizado = service.atualizar(id, dto);
        return ResponseEntity.ok(atualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
