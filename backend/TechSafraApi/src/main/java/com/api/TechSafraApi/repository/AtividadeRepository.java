package com.api.TechSafraApi.repository;

import com.api.TechSafraApi.model.AtividadeModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AtividadeRepository extends JpaRepository<AtividadeModel, Long> {
    // Busca pelo usuário e ordena pela data (mais novo primeiro)
    List<AtividadeModel> findByUsuarioIdOrderByDataHoraDesc(Long usuarioId);
}