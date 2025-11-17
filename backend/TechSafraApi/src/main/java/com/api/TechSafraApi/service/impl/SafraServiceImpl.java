package com.api.TechSafraApi.service.impl;

import java.util.List;
import java.util.stream.Collectors;
 
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.api.TechSafraApi.dtos.SafraRequestDto;
import com.api.TechSafraApi.dtos.SafraResponseDto;
import com.api.TechSafraApi.exception.ResourceNotFoundException;
import com.api.TechSafraApi.model.SafraModel;
import com.api.TechSafraApi.repository.SafraRepository;
import com.api.TechSafraApi.service.SafraService;
  
 
@Service
@Transactional
public class SafraServiceImpl implements SafraService {
	    private final SafraRepository repository;
	    public SafraServiceImpl(SafraRepository repository) {
	        this.repository = repository;
	    }
	    private SafraResponseDto toDto(SafraModel s) {
	        return new SafraResponseDto(s.getId(), s.getNome(), s.getCultura(), s.getAno(), s.getAreaPlantada());
	    }
	    private SafraModel fromDto(SafraRequestDto dto) {
	        return new SafraModel(dto.getNome(), dto.getCultura(), dto.getAno(), dto.getAreaPlantada());
	    }
	    @Override
	    public SafraResponseDto criar(SafraRequestDto dto) {
	        SafraModel nova = fromDto(dto);
	        SafraModel salva = repository.save(nova);
	        return toDto(salva);
	    }
	    @Override
	    @Transactional(readOnly = true)
	    public List<SafraResponseDto> listarTodos() {
	        return repository.findAll().stream().map(this::toDto).collect(Collectors.toList());
	    }
	    @Override
	    public SafraResponseDto atualizar(Long id, SafraRequestDto dto) {
	        SafraModel existente = repository.findById(id)
	                .orElseThrow(() -> new ResourceNotFoundException("Safra não encontrada com id: " + id));
	        existente.setNome(dto.getNome());
	        existente.setCultura(dto.getCultura());
	        existente.setAno(dto.getAno());
	        existente.setAreaPlantada(dto.getAreaPlantada());
	        SafraModel atualizada = repository.save(existente);
	        return toDto(atualizada);
	    }
	    @Override
	    public void deletar(Long id) {
	        if (!repository.existsById(id)) {
	            throw new ResourceNotFoundException("Safra não encontrada com id: " + id);
	        }
	        repository.deleteById(id);
	    }
	    @Override
	    @Transactional(readOnly = true)
	    public SafraResponseDto buscarPorId(Long id) {
	        return repository.findById(id).map(this::toDto)
	                .orElseThrow(() -> new ResourceNotFoundException("Safra não encontrada com id: " + id));
	    }
	}