package com.api.TechSafraApi.service;

import com.api.TechSafraApi.dtos.MaquinarioDto;
import com.api.TechSafraApi.model.MaquinarioModel;
import java.util.List;

public interface MaquinarioService {
    List<MaquinarioModel> listarTodos();
    MaquinarioModel buscarPorId(Long id);
    MaquinarioModel salvar(MaquinarioDto dto);
    MaquinarioModel atualizar(Long id, MaquinarioDto dto);
    void deletar(Long id);
}