package com.api.TechSafraApi.dtos;

public record MaquinarioDto(
        String nome,
        String tipo,
        int horasTrabalhadasDia,
        int horasManutencaoPrevista,
        String situacao,
        String observacoes,
        Long usuarioId
) {}
