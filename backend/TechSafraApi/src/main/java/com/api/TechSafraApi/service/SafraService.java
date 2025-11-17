package com.api.TechSafraApi.service;

import java.util.List;

import com.api.TechSafraApi.dtos.SafraRequestDto;
import com.api.TechSafraApi.dtos.SafraResponseDto;
 
public interface SafraService {
	SafraResponseDto criar(SafraRequestDto dto);
    List<SafraResponseDto> listarTodos();
    SafraResponseDto atualizar(Long id, SafraRequestDto dto);
    void deletar(Long id);
    SafraResponseDto buscarPorId(Long id);
}