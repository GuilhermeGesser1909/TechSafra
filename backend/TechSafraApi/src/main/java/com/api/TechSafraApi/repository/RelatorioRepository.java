package com.api.TechSafraApi.repository;

import com.api.TechSafraApi.model.RelatorioModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RelatorioRepository extends JpaRepository<RelatorioModel, Long> {
    // Aqui podemos adicionar métodos customizados se necessário
}