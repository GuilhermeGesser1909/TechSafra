package com.api.TechSafraApi.dtos;

import java.util.UUID;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

// DTO para criação de propriedade vinculada a um usuário
public record PropriedadeDto(
        @NotBlank String nome,
        @NotBlank String localizacao,
        @NotBlank String estado,
        @Positive Double areaHectares,
        Double areaCultivavel,
        Double areaReserva,
        String solo,
        String topografia,
        String irrigacao,
        String culturaPrincipal,
        String culturaSecundaria,
        Integer numTalhoes,
        String responsavel,
        String telefone,
        String emailContato,
        String cnpjCpf,
        String cep,
        String endereco,
        String latitude,
        String longitude,
        String observacoes,
        @NotNull UUID usuarioId
) { }
