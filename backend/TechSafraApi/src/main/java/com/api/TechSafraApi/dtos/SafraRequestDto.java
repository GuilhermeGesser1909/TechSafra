package com.api.TechSafraApi.dtos;

import java.time.LocalDate;

import jakarta.validation.constraints.NotNull;

public class SafraRequestDto {

    private String nome;
    private String cultura;
    private LocalDate dataInicio;
    private LocalDate dataFim;
    private double areaPlantada;
    private double producaoEsperada;
    private double custos;
    private String observacoes;
    @NotNull(message = "O ID da propriedade é obrigatório") 
    private Integer propriedadeId;
    
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getCultura() {
		return cultura;
	}
	public void setCultura(String cultura) {
		this.cultura = cultura;
	}
	public LocalDate getDataInicio() {
		return dataInicio;
	}
	public void setDataInicio(LocalDate dataInicio) {
		this.dataInicio = dataInicio;
	}
	public LocalDate getDataFim() {
		return dataFim;
	}
	public void setDataFim(LocalDate dataFim) {
		this.dataFim = dataFim;
	}
	public double getAreaPlantada() {
		return areaPlantada;
	}
	public void setAreaPlantada(double areaPlantada) {
		this.areaPlantada = areaPlantada;
	}
	public double getProducaoEsperada() {
		return producaoEsperada;
	}
	public void setProducaoEsperada(double producaoEsperada) {
		this.producaoEsperada = producaoEsperada;
	}
	public double getCustos() {
		return custos;
	}
	public void setCustos(double custos) {
		this.custos = custos;
	}
	public String getObservacoes() {
		return observacoes;
	}
	public void setObservacoes(String observacoes) {
		this.observacoes = observacoes;
	}
	public Integer getPropriedadeId() {
		return null;
	}

   
}



