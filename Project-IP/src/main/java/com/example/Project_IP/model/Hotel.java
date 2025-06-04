// Hotel.java (model)
package com.example.Project_IP.model;

import lombok.Data;
// Import necesar pentru maparea cu Firebase/Jackson
import com.fasterxml.jackson.annotation.JsonProperty;

@Data
public class Hotel {
    private String id;
    private String nume;
    private String descriere;
    private String locatie;
    private String idManager;
    private String numeManager; // camp existent, dar nu e populat automat de metodele de baza


    @JsonProperty("pretNoapte")
    private Double pretNoapte;

    // Câmp pentru imagine
    @JsonProperty("imagine") // Asigură maparea corectă (verifică numele exact în Firebase)
    private String imagine; // Tipul String pentru URL-ul imaginii

    // Câmpuri pentru numărul de camere pe categorii
    private Integer singleRoomCount = 0;
    private Integer doubleRoomCount = 0;
    private Integer tripleRoomCount = 0;


    // Constructor gol, necesar pentru maparea Firebase
    public Hotel() {
    }

    // Constructor cu toți parametrii (opțional, dar util)
    public Hotel(String id, String nume, String descriere, String locatie, String idManager, String numeManager, Double pretNoapte, String imagine, Integer singleRoomCount, Integer doubleRoomCount, Integer tripleRoomCount) {
        this.id = id;
        this.nume = nume;
        this.descriere = descriere;
        this.locatie = locatie;
        this.idManager = idManager;
        this.numeManager = numeManager;
        this.pretNoapte = pretNoapte;
        this.imagine = imagine;
        this.singleRoomCount = singleRoomCount;
        this.doubleRoomCount = doubleRoomCount;
        this.tripleRoomCount = tripleRoomCount;
    }


    // Gettere și Settere (Lombok @Data le generează, dar le poți lăsa explicit dacă vrei)
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    // Lombok @Data va genera automat getPretNoapte, setPretNoapte, getImagine, setImagine etc.
}