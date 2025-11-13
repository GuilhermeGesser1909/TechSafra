package com.api.TechSafraApi.controller;

import com.api.TechSafraApi.dtos.PropriedadeDto;
import com.api.TechSafraApi.model.PropriedadeModel;
import com.api.TechSafraApi.service.PropriedadeService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/propriedades")
@CrossOrigin(origins = "*") 
public class PropriedadeController {

    private final PropriedadeService service;

    public PropriedadeController(PropriedadeService service) {
        this.service = service;
    }

    // 🔹 Listar todas as propriedades
    @GetMapping
    public ResponseEntity<List<PropriedadeModel>> listar() {
        return ResponseEntity.ok(service.listarTodas());
    }

    // 🔹 Buscar propriedade por ID
    @GetMapping("/{id}")
    public ResponseEntity<PropriedadeModel> buscar(@PathVariable Long id) {
        PropriedadeModel propriedade = service.buscarPorId(id);
        return ResponseEntity.ok(propriedade);
    }

    // 🔹 Criar uma nova propriedade
    @PostMapping
    public ResponseEntity<PropriedadeModel> salvar(@RequestBody @Valid PropriedadeDto dto) {
        PropriedadeModel nova = service.salvar(dto);
        return ResponseEntity.ok(nova);
    }

    // 🔹 Deletar propriedade por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
    
    // Editar uma propriedade
    
    @PutMapping("/{id}")
    public ResponseEntity<PropriedadeModel> atualizar(
            @PathVariable Long id,
            @RequestBody @Valid PropriedadeDto dto) {
        PropriedadeModel atualizada = service.atualizar(id, dto);
        return ResponseEntity.ok(atualizada);
    }

}
