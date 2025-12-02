package com.api.TechSafraApi.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "TB_ANALISE_SOLO")
public class AnaliseSoloModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false)
    private String area;

    @Column(nullable = false)
    private String tipoSolo;

    @Column(nullable = false)
    private double ph;

    @Column(nullable = false)
    private double materiaOrganica;

    @Column(nullable = false)
    private LocalDate dataAnalise;
    
    @ManyToOne
    @JoinColumn(name = "propriedade_id", nullable = false)
    @JsonIgnoreProperties({"usuario", "observacoes"}) // Evita loop infinito ou dados desnecessários
    private PropriedadeModel propriedade;

    public UUID getId() { return id; }
    public String getArea() { return area; }
    public void setArea(String area) { this.area = area; }

    public String getTipoSolo() { return tipoSolo; }
    public void setTipoSolo(String tipoSolo) { this.tipoSolo = tipoSolo; }

    public double getPh() { return ph; }
    public void setPh(double ph) { this.ph = ph; }

    public double getMateriaOrganica() { return materiaOrganica; }
    public void setMateriaOrganica(double materiaOrganica) { this.materiaOrganica = materiaOrganica; }

    public LocalDate getDataAnalise() { return dataAnalise; }
    public void setDataAnalise(LocalDate dataAnalise) { this.dataAnalise = dataAnalise; }
    
    public PropriedadeModel getPropriedade() { return propriedade; }
    public void setPropriedade(PropriedadeModel propriedade) { this.propriedade = propriedade; }
}