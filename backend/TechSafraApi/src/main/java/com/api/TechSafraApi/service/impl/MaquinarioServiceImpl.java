package com.api.TechSafraApi.service.impl;

import com.api.TechSafraApi.dtos.MaquinarioDto;
import com.api.TechSafraApi.exception.ResourceNotFoundException;
import com.api.TechSafraApi.model.MaquinarioModel;
import com.api.TechSafraApi.repository.MaquinarioRepository;
import com.api.TechSafraApi.repository.UsuarioRepository;
import com.api.TechSafraApi.service.MaquinarioService;
import org.springframework.stereotype.Service;
import com.api.TechSafraApi.model.Usuario;


import java.util.List;
import java.util.UUID;

@Service
public class MaquinarioServiceImpl implements MaquinarioService {

    private final MaquinarioRepository repository;
    private final UsuarioRepository usuarioRepository;

    public MaquinarioServiceImpl(MaquinarioRepository repository,
                                 UsuarioRepository usuarioRepository) {
        this.repository = repository;
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public List<MaquinarioModel> listarTodas() {
        return repository.findAll();
    }

    @Override
    public MaquinarioModel buscarPorId(UUID id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public void deletar(UUID id) {
        repository.deleteById(id);
    }

    @Override
    public MaquinarioModel salvar(MaquinarioDto dto) {

        Usuario usuario = usuarioRepository.findById(dto.usuarioId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        MaquinarioModel model = new MaquinarioModel();
        model.setNome(dto.nome());
        model.setTipo(dto.tipo());
        model.setHorasTrabalhadasDia(dto.horasTrabalhadasDia());
        model.setHorasManutencaoPrevista(dto.horasManutencaoPrevista());
        model.setSituacao(dto.situacao());
        model.setObservacoes(dto.observacoes());
        model.setUsuario(usuario);

        return repository.save(model);
    }

 public MaquinarioModel atualizar(UUID id, MaquinarioDto dto) {
     MaquinarioModel maquinarioExistente = repository.findById(id)
         .orElseThrow(() -> new ResourceNotFoundException("Maquinário não encontrado com ID: " + id));

     maquinarioExistente.setNome(dto.nome());
     maquinarioExistente.setTipo(dto.tipo());
     maquinarioExistente.setHorasTrabalhadasDia(dto.horasTrabalhadasDia());
     maquinarioExistente.setHorasManutencaoPrevista(dto.horasManutencaoPrevista());
     maquinarioExistente.setSituacao(dto.situacao());
     maquinarioExistente.setObservacoes(dto.observacoes());

     return repository.save(maquinarioExistente);
 }
 
}
