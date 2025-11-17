//package com.api.TechSafraApi.service.impl;
//
//import com.api.TechSafraApi.dtos.ProdutoEstoqueDto;
//import com.api.TechSafraApi.model.ProdutoModel;
//import com.api.TechSafraApi.model.PropriedadeModel;
//import com.api.TechSafraApi.repository.ProdutoRepository;
//import com.api.TechSafraApi.repository.PropriedadeRepository;
//import com.api.TechSafraApi.service.ProdutoService;
//
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//public class ProdutoEstoqueServiceImpl implements ProdutoService {
//
//    private final ProdutoRepository produtoestoquerepository;
//    private final PropriedadeRepository propriedadeRepository;
//
//    public ProdutoEstoqueServiceImpl(
//    		ProdutoRepository produtoestoquerepository,
//    		PropriedadeRepository propriedadeRepository
//    		) {
//        this.produtoestoquerepository = produtoestoquerepository;
//        this.propriedadeRepository = propriedadeRepository;
//        
//    }
//
//    @Override
//    public List<ProdutoModel> listarTodas() {
//        return produtoestoquerepository.findAll();
//    }
//
//    @Override
//    public ProdutoModel salvar(ProdutoModel produto) {
//        return produtoestoquerepository.save(produto);
//    }
//
//    @Override
//    public ProdutoModel buscarPorId(Long id) {
//        return produtoestoquerepository.findById(id)
//        	.orElseThrow(() -> new RuntimeException("Produto não encontrado com o id: " + id));
//    }
//
//    @Override
//    public void deletar(Long id) {
//    	if (!produtoestoquerepository.existsById(id)) {
//    		throw new RuntimeException("Produto com ID " + "não encontrada para exclusão.");
//    	}
//        produtoestoquerepository.deleteById(id);
//    }
//
//    @Override
//    public ProdutoModel salvar(ProdutoEstoqueDto dto) {
//    	
//    	if (dto.propriedadeId() == null) {
//    		throw new IllegalArgumentException("O ID da propriedade é obrigatório para cadastrar um produto.");
//    	}
//    	PropriedadeModel propriedade = propriedadeRepository.findById(dto.propriedadeId())
//    			.orElseThrow(() -> new RuntimeException("Propriedade não encontrada com o ID: " + dto.propriedadeId()));
//    	
//        ProdutoModel model = new ProdutoModel();
//        model.setNome(dto.nome());
//        model.setQuantidade(dto.quantidade());
//        model.setUnidade(dto.unidade());
//        model.setPrecoUnitario(dto.precoUnitario());
//        model.setPropriedade(propriedade);
//        
//        return produtoestoquerepository.save(model);
//    }
//
//	@Override
//	public ProdutoModel atualizar(Long id, ProdutoEstoqueDto dto) {
//		ProdutoModel anterior = buscarPorId(id);
//		anterior.setNome(dto.nome());
//		anterior.setQuantidade(dto.quantidade());
//		anterior.setUnidade(dto.unidade());
//		anterior.setPrecoUnitario(dto.precoUnitario());
//		
//		return produtoestoquerepository.save(anterior);
//	}
//}