package com.api.TechSafraApi.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record MaquinarioDto(
        @NotBlank(message = "O nome do maquinário é obrigatório.")
        String nome,

        @NotBlank(message = "O tipo do maquinário é obrigatório.")
        String tipo,

        @NotNull(message = "Informe as horas trabalhadas por dia.")
        Integer horasTrabalhadasDia,

        @NotNull(message = "Informe as horas previstas para manutenção.")
        Integer horasManutencaoPrevista,

        @NotBlank(message = "A situação é obrigatória (ex: Ativo, Inativo).")
        String situacao,

        String observacoes,

        @NotNull(message = "O ID do usuário é obrigatório para vincular o maquinário.")
        Long usuarioId
) {}