package com.api.TechSafraApi.service;

import com.api.TechSafraApi.dtos.ProdutoDto;
import com.api.TechSafraApi.model.ProdutoModel;
import com.api.TechSafraApi.repository.ProdutoRepository;
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
}
