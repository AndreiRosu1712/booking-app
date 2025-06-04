package com.example.Project_IP.service;

import com.example.Project_IP.dto.LoginRequestDto;
import com.example.Project_IP.dto.LoginResponseDto;
import com.example.Project_IP.dto.RegisterRequestDto;
import com.example.Project_IP.dto.RegisterResponseDto;
import com.example.Project_IP.model.User;
import com.example.Project_IP.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilizatorul nu există."));
    }

    public LoginResponseDto login(LoginRequestDto request) {
        User user = userRepository.findByUsernameOrMail(request.getIdentifier(), request.getIdentifier())
                .orElseThrow(() -> new RuntimeException("Utilizatorul nu a fost găsit."));

        if (!user.getParola().equals(request.getParola())) {
            throw new RuntimeException("Parolă incorectă.");
        }

        return new LoginResponseDto(
            "Autentificare reușită!",
            user.getRol(),
            user.getId().toString()
        );
    }

    public RegisterResponseDto register(RegisterRequestDto request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username deja folosit.");
        }
        if (userRepository.existsByMail(request.getMail())) {
            throw new RuntimeException("Email deja folosit.");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setParola(request.getParola());
        user.setMail(request.getMail());
        user.setNume(request.getNume());
        user.setPrenume(request.getPrenume());
        user.setRol(request.getRol());

        if ("client".equalsIgnoreCase(request.getRol())) {
            user.setSold(0f);
        } else if ("manager".equalsIgnoreCase(request.getRol())) {
            user.setIdHotels("");
        } else {
            throw new RuntimeException("Rol invalid (trebuie să fie 'client' sau 'manager')");
        }

        userRepository.save(user);

        return new RegisterResponseDto("Utilizator înregistrat cu succes!");
    }
}
