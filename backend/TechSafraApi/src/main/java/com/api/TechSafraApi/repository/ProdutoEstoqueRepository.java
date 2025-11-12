package com.api.TechSafraApi.repository;

import com.api.TechSafraApi.model.ProdutoEstoqueModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface ProdutoEstoqueRepository extends JpaRepository<ProdutoEstoqueModel, UUID> {

    void deleteById(UUID id);

    Optional<ProdutoEstoqueModel> findById(UUID id);
}
