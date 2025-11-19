package com.api.TechSafraApi.service;

import com.api.TechSafraApi.dtos.MaquinarioDto;
import com.api.TechSafraApi.model.MaquinarioModel;

import java.util.List;
import java.util.UUID;

public interface MaquinarioService {
    List<MaquinarioModel> listarTodas();
    MaquinarioModel buscarPorId(UUID id);
    void deletar(UUID id);
    MaquinarioModel salvar(MaquinarioDto dto);
}
