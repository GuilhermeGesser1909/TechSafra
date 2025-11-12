package com.api.TechSafraApi.model;

import jakarta.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "TB_PRODUTO_ESTOQUE")
public class ProdutoEstoqueModel implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String nome;
    private int quantidade;
    private String unidade;
    private double precoUnitario;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "propriedade_id", nullable = false)
    private PropriedadeModel propriedade;

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public int getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }

    public String getUnidade() {
        return unidade;
    }

    public void setUnidade(String unidade) {
        this.unidade = unidade;
    }

    public double getPrecoUnitario() {
        return precoUnitario;
    }

    public void setPrecoUnitario(double precoUnitario) {
        this.precoUnitario = precoUnitario;
    }

    public PropriedadeModel getPropriedade() {
        return propriedade;
    }

    public void setPropriedade(PropriedadeModel propriedade) {
        this.propriedade = propriedade;
    }
}
