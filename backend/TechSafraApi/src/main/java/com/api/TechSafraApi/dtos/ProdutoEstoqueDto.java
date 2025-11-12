package com.api.TechSafraApi.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;

public record ProdutoEstoqueDto(
        @NotBlank String nome,
        @PositiveOrZero int quantidade,
        @NotBlank String unidade,
        @PositiveOrZero double precoUnitario
) {
    // getters gerados automaticamente pelo record
}
