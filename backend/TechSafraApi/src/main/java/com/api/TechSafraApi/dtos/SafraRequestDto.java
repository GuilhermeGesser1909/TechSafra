package com.api.TechSafraApi.dtos;

public class SafraRequestDto {

	private String nome;

    private String cultura;

    private int ano;

    private double areaPlantada;

    public SafraRequestDto() {}

    public String getNome() { return nome; }

    public void setNome(String nome) { this.nome = nome; }

    public String getCultura() { return cultura; }

    public void setCultura(String cultura) { this.cultura = cultura; }

    public int getAno() { return ano; }

    public void setAno(int ano) { this.ano = ano; }

    public double getAreaPlantada() { return areaPlantada; }

    public void setAreaPlantada(double areaPlantada) { this.areaPlantada = areaPlantada; }

}


