package com.api.TechSafraApi.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;

public record MaquinarioDto(
        @NotBlank String nome,
        @NotBlank String fabricante,
        @PositiveOrZero int anoAquisicao,
        @NotBlank String estado
) {
    // getters do record
}
