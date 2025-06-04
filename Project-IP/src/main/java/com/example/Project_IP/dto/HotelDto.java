package com.example.Project_IP.dto;

import lombok.Data;

@Data
public class HotelDto {
    private String nume;
    private String locatie;
    private Double pretNoapte;
    private String descriere;
    private String imagine;
    // Added fields for room counts
    private Integer singleRoomCount;
    private Integer doubleRoomCount;
    private Integer tripleRoomCount;
}