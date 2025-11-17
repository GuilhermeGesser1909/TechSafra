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
}
