package com.api.TechSafraApi.service.impl;

import com.api.TechSafraApi.dtos.ProdutoEstoqueDto;
import com.api.TechSafraApi.model.ProdutoEstoqueModel;
import com.api.TechSafraApi.model.PropriedadeModel;
import com.api.TechSafraApi.repository.ProdutoEstoqueRepository;
import com.api.TechSafraApi.repository.PropriedadeRepository;
import com.api.TechSafraApi.service.ProdutoEstoqueService;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProdutoEstoqueServiceImpl implements ProdutoEstoqueService {

    private final ProdutoEstoqueRepository produtoestoquerepository;
    private final PropriedadeRepository propriedadeRepository;

    public ProdutoEstoqueServiceImpl(
    		ProdutoEstoqueRepository produtoestoquerepository,
    		PropriedadeRepository propriedadeRepository
    		) {
        this.produtoestoquerepository = produtoestoquerepository;
        this.propriedadeRepository = propriedadeRepository;
        
    }

    @Override
    public List<ProdutoEstoqueModel> listarTodas() {
        return produtoestoquerepository.findAll();
    }

    @Override
    public ProdutoEstoqueModel salvar(ProdutoEstoqueModel produto) {
        return produtoestoquerepository.save(produto);
    }

    @Override
    public ProdutoEstoqueModel buscarPorId(Long id) {
        return produtoestoquerepository.findById(id)
        	.orElseThrow(() -> new RuntimeException("Produto não encontrado com o id: " + id));
    }

    @Override
    public void deletar(Long id) {
    	if (!produtoestoquerepository.existsById(id)) {
    		throw new RuntimeException("Produto com ID " + "não encontrada para exclusão.");
    	}
        produtoestoquerepository.deleteById(id);
    }

    @Override
    public ProdutoEstoqueModel salvar(ProdutoEstoqueDto dto) {
    	
    	if (dto.propriedadeId() == null) {
    		throw new IllegalArgumentException("O ID da propriedade é obrigatório para cadastrar um produto.");
    	}
    	PropriedadeModel propriedade = propriedadeRepository.findById(dto.propriedadeId())
    			.orElseThrow(() -> new RuntimeException("Propriedade não encontrada com o ID: " + dto.propriedadeId()));
    	
        ProdutoEstoqueModel model = new ProdutoEstoqueModel();
        model.setNome(dto.nome());
        model.setQuantidade(dto.quantidade());
        model.setUnidade(dto.unidade());
        model.setPrecoUnitario(dto.precoUnitario());
        model.setPropriedade(propriedade);
        
        return produtoestoquerepository.save(model);
    }

	@Override
	public ProdutoEstoqueModel atualizar(Long id, ProdutoEstoqueDto dto) {
		ProdutoEstoqueModel anterior = buscarPorId(id);
		anterior.setNome(dto.nome());
		anterior.setQuantidade(dto.quantidade());
		anterior.setUnidade(dto.unidade());
		anterior.setPrecoUnitario(dto.precoUnitario());
		
		return produtoestoquerepository.save(anterior);
	}
}