package com.api.TechSafraApi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.api.TechSafraApi.model.AnaliseSoloModel;
import java.util.UUID;

public interface AnaliseSoloRepository extends JpaRepository<AnaliseSoloModel, UUID> {
}
