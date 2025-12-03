package com.api.TechSafraApi.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "TB_MAQUINARIOS")
public class MaquinarioModel implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Mudado para IDENTITY (Padrão Long)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String tipo;

    private int horasTrabalhadasDia;
    private int horasManutencaoPrevista;
    private String situacao;

    @Column(columnDefinition = "TEXT")
    private String observacoes;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    @JsonIgnoreProperties({"senha", "email", "propriedades"}) // Evita loop infinito no JSON
    private Usuario usuario;

    // Construtor vazio
    public MaquinarioModel() {}

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