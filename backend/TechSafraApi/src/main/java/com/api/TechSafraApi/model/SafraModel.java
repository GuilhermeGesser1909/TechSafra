package com.api.TechSafraApi.model;

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
    private int ano;
    private double areaPlantada;
    public SafraModel() {
    }
    public SafraModel(String nome, String cultura, int ano, double areaPlantada) {
        this.nome = nome;
        this.cultura = cultura;
        this.ano = ano;
        this.areaPlantada = areaPlantada;
    }
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public String getCultura() { return cultura; }
    public void setCultura(String cultura) { this.cultura = cultura; }
    public int getAno() { return ano; }
    public void setAno(int ano) { this.ano = ano; }
    public double getAreaPlantada() { return areaPlantada; }
    public void setAreaPlantada(double areaPlantada) { this.areaPlantada = areaPlantada; }
}
