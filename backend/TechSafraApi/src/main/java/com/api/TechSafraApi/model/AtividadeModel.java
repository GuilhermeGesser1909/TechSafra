package com.api.TechSafraApi.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "TB_ATIVIDADES")
public class AtividadeModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String descricao; // Ex: "Cadastrou novo maquinário: Trator A"

    private LocalDateTime dataHora;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    public AtividadeModel() {}

    public AtividadeModel(String descricao, Usuario usuario) {
        this.descricao = descricao;
        this.usuario = usuario;
        this.dataHora = LocalDateTime.now(); // Pega a hora atual automaticamente
    }

    // Getters
    public Long getId() { return id; }
    public String getDescricao() { return descricao; }
    public LocalDateTime getDataHora() { return dataHora; }
    public Usuario getUsuario() { return usuario; }
    
    // Setters
    public void setDescricao(String descricao) { this.descricao = descricao; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }
}