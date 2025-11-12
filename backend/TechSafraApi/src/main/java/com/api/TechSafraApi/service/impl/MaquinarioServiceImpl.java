package com.api.TechSafraApi.service.impl;

import com.api.TechSafraApi.dtos.MaquinarioDto;
import com.api.TechSafraApi.model.MaquinarioModel;
import com.api.TechSafraApi.repository.MaquinarioRepository;
import com.api.TechSafraApi.service.MaquinarioService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class MaquinarioServiceImpl implements MaquinarioService {

    private final MaquinarioRepository repository;

    public MaquinarioServiceImpl(MaquinarioRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<MaquinarioModel> listarTodas() {
        return repository.findAll();
    }

    @Override
    public MaquinarioModel salvar(MaquinarioModel maquinario) {
        return repository.save(maquinario);
    }

    @Override
    public MaquinarioModel buscarPorId(UUID id) {
        Optional<MaquinarioModel> opt = repository.findById(id);
        return opt.orElse(null);
    }

    @Override
    public void deletar(UUID id) {
        repository.deleteById(id);
    }

    @Override
    public MaquinarioModel salvar(MaquinarioDto dto) {
        MaquinarioModel model = new MaquinarioModel();
        model.setNome(dto.nome());
        model.setFabricante(dto.fabricante());
        model.setAnoAquisicao(dto.anoAquisicao());
        model.setEstado(dto.estado());
        return repository.save(model);
    }
}
