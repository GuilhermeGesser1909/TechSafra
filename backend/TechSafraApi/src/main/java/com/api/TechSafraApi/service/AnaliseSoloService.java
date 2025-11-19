package com.api.TechSafraApi.service;

import com.api.TechSafraApi.model.AnaliseSoloModel;
import com.api.TechSafraApi.repository.AnaliseSoloRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AnaliseSoloService {

    private final AnaliseSoloRepository repository;

    public AnaliseSoloService(AnaliseSoloRepository repository) {
        this.repository = repository;
    }

    public AnaliseSoloModel criarAnalise(AnaliseSoloModel analise) {
        return repository.save(analise);
    }

    public List<AnaliseSoloModel> listarAnalises() {
        return repository.findAll();
    }

    public Optional<AnaliseSoloModel> atualizarAnalise(UUID id, AnaliseSoloModel analiseAtualizada) {
        return repository.findById(id).map(analise -> {
            analise.setArea(analiseAtualizada.getArea());
            analise.setTipoSolo(analiseAtualizada.getTipoSolo());
            analise.setPh(analiseAtualizada.getPh());
            analise.setMateriaOrganica(analiseAtualizada.getMateriaOrganica());
            analise.setDataAnalise(analiseAtualizada.getDataAnalise());
            return repository.save(analise);
        });
    }

    public void apagarAnalise(UUID id) {
        repository.deleteById(id);
    }
}
