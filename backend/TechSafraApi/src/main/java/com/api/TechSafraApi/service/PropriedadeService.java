package com.api.TechSafraApi.service;

import com.api.TechSafraApi.dtos.PropriedadeDto;
import com.api.TechSafraApi.model.PropriedadeModel;

import java.util.List;

public interface PropriedadeService {
    List<PropriedadeModel> listarTodas();
    PropriedadeModel salvar(PropriedadeModel propriedade);
    PropriedadeModel buscarPorId(Long id);
    void deletar(Long id);
    PropriedadeModel salvar(PropriedadeDto dto);
    PropriedadeModel atualizar(Long id, PropriedadeDto dto);
}
