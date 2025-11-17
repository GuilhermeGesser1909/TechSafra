package com.api.TechSafraApi.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

public class ProdutoDto {

    @NotBlank(message = "O nome do produto é obrigatório.")
    private String nomeProduto;

    @NotNull(message = "A quantidade é obrigatória.")
    private Double quantidade;

    @NotBlank(message = "O tipo é obrigatório.")
    private String tipoProduto;

    @NotNull(message = "O custo é obrigatório.")
    private BigDecimal custo;

    public String getNomeProduto() {
        return nomeProduto;
    }

    public void setNomeProduto(String nomeProduto) {
        this.nomeProduto = nomeProduto;
    }

    public Double getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Double quantidade) {
        this.quantidade = quantidade;
    }

    public String getTipoProduto() {
        return tipoProduto;
    }

    public void setTipoProduto(String tipoProduto) {
        this.tipoProduto = tipoProduto;
    }

    public BigDecimal getCusto() {
        return custo;
    }

    public void setCusto(BigDecimal custo) {
        this.custo = custo;
    }
}
