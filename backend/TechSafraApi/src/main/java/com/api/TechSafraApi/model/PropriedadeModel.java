package com.api.TechSafraApi.model;

import jakarta.persistence.*;
import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

@Entity
@Table(name = "TB_PROPRIEDADE")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PropriedadeModel implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nome;

    @Column(nullable = false, length = 100)
    private String localizacao;

    @Column(nullable = true, length = 50)
    private String estado;

    @Column(nullable = false)
    private double areaHectares;

    @Column(nullable = true)
    private Double areaCultivavel;

    @Column(nullable = true)
    private Double areaReserva;

    @Column(nullable = true, length = 100)
    private String solo;

    @Column(nullable = true, length = 100)
    private String topografia;

    @Column(nullable = true, length = 100)
    private String irrigacao;

    @Column(nullable = true, length = 100)
    private String culturaPrincipal;

    @Column(nullable = true, length = 100)
    private String culturaSecundaria;

    @Column(nullable = true)
    private Integer numTalhoes;

    @Column(nullable = true, length = 100)
    private String responsavel;

    @Column(nullable = true, length = 20)
    private String telefone;

    @Column(nullable = true, length = 100)
    private String emailContato;

    @Column(nullable = true, length = 20)
    private String cnpjCpf;

    @Column(nullable = true, length = 20)
    private String cep;

    @Column(nullable = true, length = 200)
    private String endereco;

    @Column(nullable = true, length = 50)
    private String latitude;

    @Column(nullable = true, length = 50)
    private String longitude;

    @Column(columnDefinition = "TEXT")
    private String observacoes;

    // 🔹 Relacionamento com o usuário (muitas propriedades -> um usuário)
    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    @JsonIgnoreProperties({"senha", "email", "cpf"}) // não manda dados sensíveis
    private Usuario usuario;

    // 🔹 Construtores
    public PropriedadeModel() {}

 // 🔹 Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getLocalizacao() { return localizacao; }
    public void setLocalizacao(String localizacao) { this.localizacao = localizacao; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }

    public double getAreaHectares() { return areaHectares; }
    public void setAreaHectares(double areaHectares) { this.areaHectares = areaHectares; }

    public Double getAreaCultivavel() { return areaCultivavel; }
    public void setAreaCultivavel(Double areaCultivavel) { this.areaCultivavel = areaCultivavel; }

    public Double getAreaReserva() { return areaReserva; }
    public void setAreaReserva(Double areaReserva) { this.areaReserva = areaReserva; }

    public String getSolo() { return solo; }
    public void setSolo(String solo) { this.solo = solo; }

    public String getTopografia() { return topografia; }
    public void setTopografia(String topografia) { this.topografia = topografia; }

    public String getIrrigacao() { return irrigacao; }
    public void setIrrigacao(String irrigacao) { this.irrigacao = irrigacao; }

    public String getCulturaPrincipal() { return culturaPrincipal; }
    public void setCulturaPrincipal(String culturaPrincipal) { this.culturaPrincipal = culturaPrincipal; }

    public String getCulturaSecundaria() { return culturaSecundaria; }
    public void setCulturaSecundaria(String culturaSecundaria) { this.culturaSecundaria = culturaSecundaria; }

    public Integer getNumTalhoes() { return numTalhoes; }
    public void setNumTalhoes(Integer numTalhoes) { this.numTalhoes = numTalhoes; }

    public String getResponsavel() { return responsavel; }
    public void setResponsavel(String responsavel) { this.responsavel = responsavel; }

    public String getTelefone() { return telefone; }
    public void setTelefone(String telefone) { this.telefone = telefone; }

    public String getEmailContato() { return emailContato; }
    public void setEmailContato(String emailContato) { this.emailContato = emailContato; }

    public String getCnpjCpf() { return cnpjCpf; }
    public void setCnpjCpf(String cnpjCpf) { this.cnpjCpf = cnpjCpf; }

    public String getCep() { return cep; }
    public void setCep(String cep) { this.cep = cep; }

    public String getEndereco() { return endereco; }
    public void setEndereco(String endereco) { this.endereco = endereco; }

    public String getLatitude() { return latitude; }
    public void setLatitude(String latitude) { this.latitude = latitude; }

    public String getLongitude() { return longitude; }
    public void setLongitude(String longitude) { this.longitude = longitude; }

    public String getObservacoes() { return observacoes; }
    public void setObservacoes(String observacoes) { this.observacoes = observacoes; }

    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }
}
