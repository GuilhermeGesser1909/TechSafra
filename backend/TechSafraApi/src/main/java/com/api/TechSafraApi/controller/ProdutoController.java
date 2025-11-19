package com.api.TechSafraApi.controller;

import com.api.TechSafraApi.dtos.ProdutoDto;
import com.api.TechSafraApi.model.ProdutoModel;
import com.api.TechSafraApi.service.ProdutoService;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/produtos")
@CrossOrigin(origins = "*")
public class ProdutoController {

    private final ProdutoService service;

    public ProdutoController(ProdutoService service) {
        this.service = service;
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<ProdutoModel> cadastrar(@RequestBody @Valid ProdutoDto dto) {
        ProdutoModel salvo = service.salvar(dto);
        return ResponseEntity.ok(salvo);
    }

    @GetMapping("/listar")
    public ResponseEntity<?> listarTodos() {
        return ResponseEntity.ok(service.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
        ProdutoModel model = service.buscarPorId(id);
        if (model == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(model);
    }

    @PutMapping("/editar/{id}")
    public ResponseEntity<?> editar(@PathVariable Long id, @RequestBody @Valid ProdutoDto dto) {
        ProdutoModel atualizado = service.editar(id, dto);
        if (atualizado == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(atualizado);
    }

    @DeleteMapping("/excluir/{id}")
    public ResponseEntity<?> excluir(@PathVariable Long id) {
        boolean apagou = service.excluir(id);
        if (!apagou) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}