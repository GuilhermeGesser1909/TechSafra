package com.api.TechSafraApi.service.impl;

import com.api.TechSafraApi.dtos.PropriedadeDto;
import com.api.TechSafraApi.model.PropriedadeModel;
import com.api.TechSafraApi.model.Usuario;
import com.api.TechSafraApi.repository.PropriedadeRepository;
import com.api.TechSafraApi.repository.UsuarioRepository;
import com.api.TechSafraApi.service.PropriedadeService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PropriedadeServiceImpl implements PropriedadeService {

    private final PropriedadeRepository propriedadeRepository;
    private final UsuarioRepository usuarioRepository;

    public PropriedadeServiceImpl(
            PropriedadeRepository propriedadeRepository,
            UsuarioRepository usuarioRepository
    ) {
        this.propriedadeRepository = propriedadeRepository;
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public List<PropriedadeModel> listarTodas() {
        return propriedadeRepository.findAll();
    }

    @Override
    public PropriedadeModel salvar(PropriedadeModel propriedade) {
        return propriedadeRepository.save(propriedade);
    }

    @Override
    public PropriedadeModel buscarPorId(Long id) {
        return propriedadeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Propriedade não encontrada com ID: " + id));
    }

    @Override
    public void deletar(Long id) {
        if (!propriedadeRepository.existsById(id)) {
            throw new RuntimeException("Propriedade com ID " + id + " não encontrada para exclusão.");
        }
        propriedadeRepository.deleteById(id);
    }

    @Override
    public PropriedadeModel salvar(PropriedadeDto dto) {
        if (dto.usuarioId() == null) {
            throw new IllegalArgumentException("O ID do usuário é obrigatório para cadastrar uma propriedade.");
        }

        Usuario usuario = usuarioRepository.findById(dto.usuarioId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com ID: " + dto.usuarioId()));

        PropriedadeModel model = new PropriedadeModel();
        model.setNome(dto.nome());
        model.setLocalizacao(dto.localizacao());
        model.setEstado(dto.estado());
        model.setAreaHectares(dto.areaHectares());
        model.setAreaCultivavel(dto.areaCultivavel());
        model.setAreaReserva(dto.areaReserva());
        model.setSolo(dto.solo());
        model.setTopografia(dto.topografia());
        model.setIrrigacao(dto.irrigacao());
        model.setCulturaPrincipal(dto.culturaPrincipal());
        model.setCulturaSecundaria(dto.culturaSecundaria());
        model.setNumTalhoes(dto.numTalhoes());
        model.setResponsavel(dto.responsavel());
        model.setTelefone(dto.telefone());
        model.setEmailContato(dto.emailContato());
        model.setCnpjCpf(dto.cnpjCpf());
        model.setCep(dto.cep());
        model.setEndereco(dto.endereco());
        model.setLatitude(dto.latitude());
        model.setLongitude(dto.longitude());
        model.setObservacoes(dto.observacoes());
        model.setUsuario(usuario);

        return propriedadeRepository.save(model);
    }
    
    @Override
    public PropriedadeModel atualizar(Long id, PropriedadeDto dto) {
        PropriedadeModel existente = buscarPorId(id);

        existente.setNome(dto.nome());
        existente.setLocalizacao(dto.localizacao());
        existente.setEstado(dto.estado());
        existente.setAreaHectares(dto.areaHectares());
        existente.setAreaCultivavel(dto.areaCultivavel());
        existente.setAreaReserva(dto.areaReserva());
        existente.setSolo(dto.solo());
        existente.setTopografia(dto.topografia());
        existente.setIrrigacao(dto.irrigacao());
        existente.setCulturaPrincipal(dto.culturaPrincipal());
        existente.setCulturaSecundaria(dto.culturaSecundaria());
        existente.setNumTalhoes(dto.numTalhoes());
        existente.setResponsavel(dto.responsavel());
        existente.setTelefone(dto.telefone());
        existente.setEmailContato(dto.emailContato());
        existente.setCnpjCpf(dto.cnpjCpf());
        existente.setCep(dto.cep());
        existente.setEndereco(dto.endereco());
        existente.setLatitude(dto.latitude());
        existente.setLongitude(dto.longitude());
        existente.setObservacoes(dto.observacoes());

        if (dto.usuarioId() != null && 
            (existente.getUsuario() == null || !existente.getUsuario().getId().equals(dto.usuarioId()))) {
            Usuario usuario = usuarioRepository.findById(dto.usuarioId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com ID: " + dto.usuarioId()));
            existente.setUsuario(usuario);
        }

        return propriedadeRepository.save(existente);
    }


}
