package com.api.TechSafraApi.model;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.UUID;

@Entity
@Table(name = "TB_MAQUINARIO")
public class MaquinarioModel implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private String nome;
    private String fabricante;
    private int anoAquisicao;
    private String estado; // ex: 'operacional', 'manutencao', 'descartado'
    
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getFabricante() {
		return fabricante;
	}
	public void setFabricante(String fabricante) {
		this.fabricante = fabricante;
	}
	public int getAnoAquisicao() {
		return anoAquisicao;
	}
	public void setAnoAquisicao(int anoAquisicao) {
		this.anoAquisicao = anoAquisicao;
	}
	public String getEstado() {
		return estado;
	}
	public void setEstado(String estado) {
		this.estado = estado;
	}
}
