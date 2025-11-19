package com.api.TechSafraApi.controller;

import com.api.TechSafraApi.dtos.MaquinarioDto;
import com.api.TechSafraApi.model.MaquinarioModel;
import com.api.TechSafraApi.service.MaquinarioService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/maquinarios")
@CrossOrigin(origins = "*")
public class MaquinarioController {

    private final MaquinarioService service;

    public MaquinarioController(MaquinarioService service) {
        this.service = service;
    }

    @GetMapping
    public List<MaquinarioModel> listar() {
        return service.listarTodas();
    }

    @GetMapping("/{id}")
    public MaquinarioModel buscar(@PathVariable UUID id) {
        return service.buscarPorId(id);
    }

    @PostMapping
    public MaquinarioModel salvar(@RequestBody MaquinarioDto dto) {
        return service.salvar(dto);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable UUID id) {
        service.deletar(id);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<MaquinarioModel> atualizar(@PathVariable UUID id, @RequestBody MaquinarioDto dto) {
        MaquinarioModel maquinarioAtualizado = service.atualizar(id, dto);
        return ResponseEntity.ok(maquinarioAtualizado);
    }
}
