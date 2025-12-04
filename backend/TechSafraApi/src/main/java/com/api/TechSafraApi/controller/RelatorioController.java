package com.api.TechSafraApi.controller;

import com.api.TechSafraApi.model.RelatorioModel;
import com.api.TechSafraApi.repository.RelatorioRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/relatorios")
@CrossOrigin(origins = "*") // Permite acesso do frontend
public class RelatorioController {

    private final RelatorioRepository repository;

    public RelatorioController(RelatorioRepository repository) {
        this.repository = repository;
    }

    // Listar todos os relatórios
    @GetMapping
    public List<RelatorioModel> listar() {
        return repository.findAll();
    }

    // Criar um novo relatório (para popular o banco)
    @PostMapping
    public ResponseEntity<RelatorioModel> criar(@RequestBody RelatorioModel relatorio) {
        RelatorioModel salvo = repository.save(relatorio);
        return ResponseEntity.ok(salvo);
    }
    
    // Deletar relatório
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}