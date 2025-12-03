package com.api.TechSafraApi.service;

import com.api.TechSafraApi.model.AtividadeModel;
import com.api.TechSafraApi.model.Usuario;
import com.api.TechSafraApi.repository.AtividadeRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AtividadeService {

    private final AtividadeRepository repository;

    public AtividadeService(AtividadeRepository repository) {
        this.repository = repository;
    }

    public void registrar(Usuario usuario, String descricao) {
        AtividadeModel atividade = new AtividadeModel(descricao, usuario);
        repository.save(atividade);
    }

    public List<AtividadeModel> listarRecentes(Long usuarioId) {
        // Podes limitar aqui usando stream se quiseres apenas as top 5
        return repository.findByUsuarioIdOrderByDataHoraDesc(usuarioId); 
    }
}