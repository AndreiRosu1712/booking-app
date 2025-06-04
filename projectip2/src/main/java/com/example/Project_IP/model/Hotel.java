// Hotel.java (model)
package com.example.Project_IP.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "hotels")
public class Hotel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nume;

    @Column(nullable = false)
    private String locatie;

    @Column(name = "pret_noapte", nullable = false)
    private Double pretNoapte;

    @Column(columnDefinition = "TEXT")
    private String descriere;

    @Column(name = "url_imagine")
    private String imagine;

    @Column(name = "id_manager", nullable = false)
    private Long idManager;

    public String getId() {
        return id.toString();
    }

    public void setId(String id) {
        this.id = Long.parseLong(id);
    }

    public void getName() {
        this.nume = nume;
    }

    public void getLocation() {
        this.locatie = locatie;
    }

    public void getManager() {
        this.idManager = idManager;
    }
}