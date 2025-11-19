package com.api.TechSafraApi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.api.TechSafraApi.model.SafraModel;

public interface SafraRepository extends JpaRepository<SafraModel, Long> {
 
}
