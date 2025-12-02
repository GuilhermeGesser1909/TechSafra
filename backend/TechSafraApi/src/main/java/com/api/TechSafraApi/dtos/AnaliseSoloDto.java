package com.api.TechSafraApi.dtos;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.time.LocalDate;

public record AnaliseSoloDto(
        @NotNull(message = "A área é obrigatória")
        String area,

        @NotNull(message = "O tipo de solo é obrigatório")
        String tipoSolo,

        @Positive(message = "O pH deve ser positivo")
        double ph,

        @Positive(message = "A matéria orgânica deve ser positiva")
        double materiaOrganica,

        @NotNull(message = "A data da análise é obrigatória")
        LocalDate dataAnalise,

        @NotNull(message = "O ID da propriedade é obrigatório")
        Long propriedadeId
) {}