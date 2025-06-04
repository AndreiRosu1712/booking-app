package com.example.Project_IP.repository;

import com.example.Project_IP.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByMail(String mail);
    Optional<User> findByUsernameOrMail(String username, String mail);
    boolean existsByUsername(String username);
    boolean existsByMail(String mail);
}
