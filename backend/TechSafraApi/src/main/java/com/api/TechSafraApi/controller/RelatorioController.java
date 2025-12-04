package com.api.TechSafraApi.controller;

import com.api.TechSafraApi.model.RelatorioModel;
import com.api.TechSafraApi.repository.RelatorioRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/relatorios")
@CrossOrigin(origins = "*") // Isso permite o acesso, mas o endpoint precisa existir!
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

    // --- NOVO MÉTODO: Buscar relatório específico por ID ---
    @GetMapping("/{id}")
    public ResponseEntity<RelatorioModel> buscarPorId(@PathVariable Long id) {
        return repository.findById(id)
                .map(relatorio -> ResponseEntity.ok(relatorio))
                .orElse(ResponseEntity.notFound().build());
    }

    // Criar um novo relatório
    @PostMapping
    public ResponseEntity<RelatorioModel> criar(@RequestBody RelatorioModel relatorio) {
        RelatorioModel salvo = repository.save(relatorio);
        return ResponseEntity.ok(salvo);
    }
    
    // Deletar relatório
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}