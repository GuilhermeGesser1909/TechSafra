package com.api.TechSafraApi.service;

import com.api.TechSafraApi.dtos.ProdutoDto;
import com.api.TechSafraApi.model.ProdutoModel;
import com.api.TechSafraApi.repository.ProdutoRepository;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class ProdutoService {

    private final ProdutoRepository repository;

    public ProdutoService(ProdutoRepository repository) {
        this.repository = repository;
    }

    public ProdutoModel salvar(ProdutoDto dto) {
        ProdutoModel model = new ProdutoModel();
        model.setNomeProduto(dto.getNomeProduto());
        model.setQuantidade(dto.getQuantidade());
        model.setTipoProduto(dto.getTipoProduto());
        model.setCusto(dto.getCusto());
        return repository.save(model);
    }

    public java.util.List<ProdutoModel> listarTodos() {
        return repository.findAll();
    }

    public ProdutoModel buscarPorId(Long id) {
        return repository.findById(id).orElse(null);
    }

    public ProdutoModel editar(Long id, ProdutoDto dto) {
        ProdutoModel model = repository.findById(id).orElse(null);
        if (model == null) {
            return null;
        }

        model.setNomeProduto(dto.getNomeProduto());
        model.setQuantidade(dto.getQuantidade());
        model.setTipoProduto(dto.getTipoProduto());
        model.setCusto(dto.getCusto());

        return repository.save(model);
    }
    
    public List<ProdutoModel> listar() {
        return repository.findAll();
    }

    public boolean excluir(Long id) {
        if (!repository.existsById(id)) {
            return false;
        }

        repository.deleteById(id);
        return true;
    }
}