package com.api.TechSafraApi.repository;

import com.api.TechSafraApi.model.MaquinarioModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MaquinarioRepository extends JpaRepository<MaquinarioModel, Long> {
    // Métodos padrões como save, findById, deleteById já estão inclusos
}