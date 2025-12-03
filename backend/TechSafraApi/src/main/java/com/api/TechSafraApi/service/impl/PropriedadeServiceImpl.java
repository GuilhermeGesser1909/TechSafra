package com.api.TechSafraApi.service.impl;

import com.api.TechSafraApi.dtos.PropriedadeDto;
import com.api.TechSafraApi.model.PropriedadeModel;
import com.api.TechSafraApi.model.Usuario;
import com.api.TechSafraApi.repository.PropriedadeRepository;
import com.api.TechSafraApi.repository.UsuarioRepository;
import com.api.TechSafraApi.service.AtividadeService; // 1. Importa o serviço de atividades
import com.api.TechSafraApi.service.PropriedadeService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional; // 2. Importa Transactional

import java.util.List;

@Service
@Transactional // 3. Adiciona Transactional na classe toda
public class PropriedadeServiceImpl implements PropriedadeService {

    private final PropriedadeRepository propriedadeRepository;
    private final UsuarioRepository usuarioRepository;
    private final AtividadeService atividadeService; // 4. Declara o serviço

    public PropriedadeServiceImpl(
            PropriedadeRepository propriedadeRepository,
            UsuarioRepository usuarioRepository,
            AtividadeService atividadeService // 5. Injeta no construtor
    ) {
        this.propriedadeRepository = propriedadeRepository;
        this.usuarioRepository = usuarioRepository;
        this.atividadeService = atividadeService;
    }

    @Override
    @Transactional(readOnly = true)
    public List<PropriedadeModel> listarTodas() {
        return propriedadeRepository.findAll();
    }

    @Override
    public PropriedadeModel salvar(PropriedadeModel propriedade) {
        // Se este método for usado internamente, também podemos logar, 
        // mas o foco principal é o salvar(DTO) abaixo.
        return propriedadeRepository.save(propriedade);
    }

    @Override
    @Transactional(readOnly = true)
    public PropriedadeModel buscarPorId(Long id) {
        return propriedadeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Propriedade não encontrada com ID: " + id));
    }

    @Override
    public void deletar(Long id) {
        // Busca a propriedade antes de deletar para saber o nome e o dono
        PropriedadeModel prop = buscarPorId(id);
        
        propriedadeRepository.deleteById(id);

        // 6. Registra a exclusão
        atividadeService.registrar(prop.getUsuario(), "Excluiu propriedade: " + prop.getNome());
    }

    @Override
    public PropriedadeModel salvar(PropriedadeDto dto) {
        if (dto.usuarioId() == null) {
            throw new IllegalArgumentException("O ID do usuário é obrigatório para cadastrar uma propriedade.");
        }

        Usuario usuario = usuarioRepository.findById(dto.usuarioId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com ID: " + dto.usuarioId()));

        PropriedadeModel model = new PropriedadeModel();
        // Copia dados do DTO para o Model
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

        PropriedadeModel salvo = propriedadeRepository.save(model);

        // 7. Registra o cadastro
        atividadeService.registrar(usuario, "Cadastrou propriedade: " + salvo.getNome());

        return salvo;
    }
    
    @Override
    public PropriedadeModel atualizar(Long id, PropriedadeDto dto) {
        PropriedadeModel existente = buscarPorId(id);

        // Atualiza campos
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

        PropriedadeModel atualizado = propriedadeRepository.save(existente);

        // 8. Registra a atualização
        atividadeService.registrar(existente.getUsuario(), "Atualizou propriedade: " + atualizado.getNome());

        return atualizado;
    }
}