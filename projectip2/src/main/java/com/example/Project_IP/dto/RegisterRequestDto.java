package com.example.Project_IP.dto;

import lombok.Data;

@Data
public class RegisterRequestDto {
    private String username;
    private String parola;
    private String mail;
    private String nume;
    private String prenume;
    private String rol; // "client" sau "manager"
}
