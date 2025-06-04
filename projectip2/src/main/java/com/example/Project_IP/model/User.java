package com.example.Project_IP.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String parola;

    @Column(nullable = false, unique = true)
    private String mail;

    @Column(nullable = false)
    private String nume;

    @Column(nullable = false)
    private String prenume;

    @Column(nullable = false)
    private String rol; // "client" sau "manager"

    @Column
    private Float sold; // pentru clienti

    @Column(name = "id_hotels")
    private String idHotels; // pentru manageri, lista de ID-uri separate prin virgula
}
