package com.api.TechSafraApi.repository;

import com.api.TechSafraApi.model.PropriedadeModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PropriedadeRepository extends JpaRepository<PropriedadeModel, Long> {

	void deleteById(Long id);

	Optional<PropriedadeModel> findById(Long id);
}
