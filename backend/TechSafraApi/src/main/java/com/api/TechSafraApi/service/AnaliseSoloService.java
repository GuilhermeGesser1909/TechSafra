package com.api.TechSafraApi.service;

import com.api.TechSafraApi.dtos.AnaliseSoloDto;
import com.api.TechSafraApi.exception.ResourceNotFoundException;
import com.api.TechSafraApi.model.AnaliseSoloModel;
import com.api.TechSafraApi.model.PropriedadeModel;
import com.api.TechSafraApi.repository.AnaliseSoloRepository;
import com.api.TechSafraApi.repository.PropriedadeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AnaliseSoloService {

    private final AnaliseSoloRepository repository;
    private final PropriedadeRepository propriedadeRepository; // Necessário para buscar a propriedade

    public AnaliseSoloService(AnaliseSoloRepository repository, PropriedadeRepository propriedadeRepository) {
        this.repository = repository;
        this.propriedadeRepository = propriedadeRepository;
    }

    public AnaliseSoloModel criarAnalise(AnaliseSoloDto dto) {
        // Buscar a propriedade pelo ID vindo do DTO
        PropriedadeModel propriedade = propriedadeRepository.findById(dto.propriedadeId())
                .orElseThrow(() -> new ResourceNotFoundException("Propriedade não encontrada com ID: " + dto.propriedadeId()));

        AnaliseSoloModel model = new AnaliseSoloModel();
        model.setArea(dto.area());
        model.setTipoSolo(dto.tipoSolo());
        model.setPh(dto.ph());
        model.setMateriaOrganica(dto.materiaOrganica());
        model.setDataAnalise(dto.dataAnalise());
        model.setPropriedade(propriedade); // Vincula a análise à propriedade

        return repository.save(model);
    }

    public List<AnaliseSoloModel> listarAnalises() {
        return repository.findAll();
    }

    public Optional<AnaliseSoloModel> atualizarAnalise(UUID id, AnaliseSoloDto dto) {
        return repository.findById(id).map(analise -> {
            analise.setArea(dto.area());
            analise.setTipoSolo(dto.tipoSolo());
            analise.setPh(dto.ph());
            analise.setMateriaOrganica(dto.materiaOrganica());
            analise.setDataAnalise(dto.dataAnalise());
            
            // Se o ID da propriedade mudar, atualizamos (opcional)
             if (dto.propriedadeId() != null && !dto.propriedadeId().equals(analise.getPropriedade().getId())) {
                 PropriedadeModel novaPropriedade = propriedadeRepository.findById(dto.propriedadeId())
                    .orElseThrow(() -> new ResourceNotFoundException("Propriedade não encontrada"));
                 analise.setPropriedade(novaPropriedade);
             }

            return repository.save(analise);
        });
    }

    public void apagarAnalise(UUID id) {
        if (!repository.existsById(id)) {
             throw new ResourceNotFoundException("Análise não encontrada para exclusão.");
        }
        repository.deleteById(id);
    }
    
    public Optional<AnaliseSoloModel> buscarPorId(UUID id) {
        return repository.findById(id);
    }
}