package com.api.TechSafraApi.service.impl;

import com.api.TechSafraApi.dtos.MaquinarioDto;
import com.api.TechSafraApi.exception.ResourceNotFoundException;
import com.api.TechSafraApi.model.MaquinarioModel;
import com.api.TechSafraApi.model.Usuario;
import com.api.TechSafraApi.repository.MaquinarioRepository;
import com.api.TechSafraApi.repository.UsuarioRepository;
import com.api.TechSafraApi.service.MaquinarioService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional // Garante que as operações no banco sejam completadas ou revertidas em caso de erro
public class MaquinarioServiceImpl implements MaquinarioService {

    private final MaquinarioRepository repository;
    private final UsuarioRepository usuarioRepository;

    public MaquinarioServiceImpl(MaquinarioRepository repository, UsuarioRepository usuarioRepository) {
        this.repository = repository;
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<MaquinarioModel> listarTodos() {
        return repository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public MaquinarioModel buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Maquinário não encontrado com ID: " + id));
    }

    @Override
    public MaquinarioModel salvar(MaquinarioDto dto) {
        // Busca o usuário pelo ID vindo do DTO
        Usuario usuario = usuarioRepository.findById(dto.usuarioId())
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado com ID: " + dto.usuarioId()));

        MaquinarioModel model = new MaquinarioModel();
        copiarDtoParaModel(dto, model);
        model.setUsuario(usuario); // Vincula ao usuário

        return repository.save(model);
    }

    @Override
    public MaquinarioModel atualizar(Long id, MaquinarioDto dto) {
        MaquinarioModel existente = buscarPorId(id);

        copiarDtoParaModel(dto, existente);

        // Se o usuário mudar (raro, mas possível), atualiza o vínculo
        if (!existente.getUsuario().getId().equals(dto.usuarioId())) {
            Usuario novoUsuario = usuarioRepository.findById(dto.usuarioId())
                    .orElseThrow(() -> new ResourceNotFoundException("Novo usuário não encontrado."));
            existente.setUsuario(novoUsuario);
        }

        return repository.save(existente);
    }

    @Override
    public void deletar(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Impossível deletar. Maquinário não encontrado com ID: " + id);
        }
        repository.deleteById(id);
    }

    // Método auxiliar para não repetir código
    private void copiarDtoParaModel(MaquinarioDto dto, MaquinarioModel model) {
        model.setNome(dto.nome());
        model.setTipo(dto.tipo());
        model.setHorasTrabalhadasDia(dto.horasTrabalhadasDia());
        model.setHorasManutencaoPrevista(dto.horasManutencaoPrevista());
        model.setSituacao(dto.situacao());
        model.setObservacoes(dto.observacoes());
    }
}