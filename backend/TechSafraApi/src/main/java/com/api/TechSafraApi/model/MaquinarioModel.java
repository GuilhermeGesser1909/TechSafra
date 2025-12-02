package com.api.TechSafraApi.model;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.UUID;

@Entity
@Table(name = "TB_MAQUINARIOS")
public class MaquinarioModel implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private String nome;
    private String tipo;
    private int horasTrabalhadasDia;
    private int horasManutencaoPrevista;
    private String situacao;
    
    @Column(columnDefinition = "TEXT")
    private String observacoes;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getTipo() {
		return tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}

	public int getHorasTrabalhadasDia() {
		return horasTrabalhadasDia;
	}

	public void setHorasTrabalhadasDia(int horasTrabalhadasDia) {
		this.horasTrabalhadasDia = horasTrabalhadasDia;
	}

	public int getHorasManutencaoPrevista() {
		return horasManutencaoPrevista;
	}

	public void setHorasManutencaoPrevista(int horasManutencaoPrevista) {
		this.horasManutencaoPrevista = horasManutencaoPrevista;
	}

	public String getSituacao() {
		return situacao;
	}

	public void setSituacao(String situacao) {
		this.situacao = situacao;
	}

	public String getObservacoes() {
        return observacoes;
    }

    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
}
