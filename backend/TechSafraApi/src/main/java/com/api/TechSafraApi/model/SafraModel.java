package com.api.TechSafraApi.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "safras")
public class SafraModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;            
    private String cultura;         
    private LocalDate dataInicio;
    private LocalDate dataFim;
    private double areaPlantada;    
    private double producaoEsperada;
    private double custos;
    private String observacoes;

    public SafraModel() {}

    public SafraModel(String nome, String cultura, LocalDate dataInicio, LocalDate dataFim,
                      double areaPlantada, double producaoEsperada, double custos, String observacoes) {
        this.setNome(nome);
        this.setCultura(cultura);
        this.setDataInicio(dataInicio);
        this.setDataFim(dataFim);
        this.setAreaPlantada(areaPlantada);
        this.setProducaoEsperada(producaoEsperada);
        this.setCustos(custos);
        this.setObservacoes(observacoes);
    }

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

	public Long getId() {  
        return id;         
    }

    public void setId(Long id) {
        this.id = id;
    }

}
