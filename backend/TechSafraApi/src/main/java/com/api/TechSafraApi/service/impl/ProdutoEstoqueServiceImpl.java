package com.api.TechSafraApi.service.impl;

import com.api.TechSafraApi.dtos.ProdutoEstoqueDto;
import com.api.TechSafraApi.model.ProdutoEstoqueModel;
import com.api.TechSafraApi.repository.ProdutoEstoqueRepository;
import com.api.TechSafraApi.service.ProdutoEstoqueService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProdutoEstoqueServiceImpl implements ProdutoEstoqueService {

    private final ProdutoEstoqueRepository repository;

    public ProdutoEstoqueServiceImpl(ProdutoEstoqueRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<ProdutoEstoqueModel> listarTodas() {
        return repository.findAll();
    }

    @Override
    public ProdutoEstoqueModel salvar(ProdutoEstoqueModel produto) {
        return repository.save(produto);
    }

    @Override
    public ProdutoEstoqueModel buscarPorId(UUID id) {
        Optional<ProdutoEstoqueModel> opt = repository.findById(id);
        return opt.orElse(null);
    }

    @Override
    public void deletar(UUID id) {
        repository.deleteById(id);
    }

    @Override
    public ProdutoEstoqueModel salvar(ProdutoEstoqueDto dto) {
        ProdutoEstoqueModel model = new ProdutoEstoqueModel();
        model.setNome(dto.nome());
        model.setQuantidade(dto.quantidade());
        model.setUnidade(dto.unidade());
        model.setPrecoUnitario(dto.precoUnitario());
        return repository.save(model);
    }
}
