package com.api.TechSafraApi.service;

import com.api.TechSafraApi.dtos.ProdutoEstoqueDto;
import com.api.TechSafraApi.model.ProdutoEstoqueModel;

import java.util.List;
import java.util.UUID;

public interface ProdutoEstoqueService {
    List<ProdutoEstoqueModel> listarTodas();
    ProdutoEstoqueModel salvar(ProdutoEstoqueModel produto);
    ProdutoEstoqueModel buscarPorId(UUID id);
    void deletar(UUID id);
    ProdutoEstoqueModel salvar(ProdutoEstoqueDto dto);
}
