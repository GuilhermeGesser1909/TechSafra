package com.api.TechSafraApi.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "TB_RELATORIOS")
public class RelatorioModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;          // Ex: Fechamento Safra Soja 2025
    private LocalDate dataGeracao;
    
    @Column(length = 1000)
    private String resumo;          // Texto descritivo do gestor

    // --- Indicadores Operacionais (KPIs) ---
    private Double areaTotal;       // Hectares (ha)
    private Double produtividade;   // Sacas por hectare (sc/ha)
    private Double producaoTotal;   // Toneladas ou Sacas totais
    private Double indiceChuva;     // Milímetros (mm) acumulados

    // --- Indicadores Financeiros e Qualidade (Novos) ---
    private Double custoPorSaca;    // R$ gastos para produzir uma saca
    private Double vendaMedia;      // R$ preço médio de venda
    private Double umidadeMedia;    // % de umidade na colheita (qualidade)

    public RelatorioModel() {}

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }

    public LocalDate getDataGeracao() { return dataGeracao; }
    public void setDataGeracao(LocalDate dataGeracao) { this.dataGeracao = dataGeracao; }

    public String getResumo() { return resumo; }
    public void setResumo(String resumo) { this.resumo = resumo; }

    public Double getAreaTotal() { return areaTotal; }
    public void setAreaTotal(Double areaTotal) { this.areaTotal = areaTotal; }

    public Double getProdutividade() { return produtividade; }
    public void setProdutividade(Double produtividade) { this.produtividade = produtividade; }

    public Double getProducaoTotal() { return producaoTotal; }
    public void setProducaoTotal(Double producaoTotal) { this.producaoTotal = producaoTotal; }

    public Double getIndiceChuva() { return indiceChuva; }
    public void setIndiceChuva(Double indiceChuva) { this.indiceChuva = indiceChuva; }

    public Double getCustoPorSaca() { return custoPorSaca; }
    public void setCustoPorSaca(Double custoPorSaca) { this.custoPorSaca = custoPorSaca; }

    public Double getVendaMedia() { return vendaMedia; }
    public void setVendaMedia(Double vendaMedia) { this.vendaMedia = vendaMedia; }

    public Double getUmidadeMedia() { return umidadeMedia; }
    public void setUmidadeMedia(Double umidadeMedia) { this.umidadeMedia = umidadeMedia; }
}