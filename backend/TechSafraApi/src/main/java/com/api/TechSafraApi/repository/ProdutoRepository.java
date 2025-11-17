package com.api.TechSafraApi.repository;

import com.api.TechSafraApi.model.ProdutoModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProdutoRepository extends JpaRepository<ProdutoModel, Long> { }
