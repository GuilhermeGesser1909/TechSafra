package com.api.TechSafraApi.repository;

import com.api.TechSafraApi.model.ProdutoEstoqueModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProdutoEstoqueRepository extends JpaRepository<ProdutoEstoqueModel, Long> {

    void deleteById(Long id);

    Optional<ProdutoEstoqueModel> findById(Long id);
}
