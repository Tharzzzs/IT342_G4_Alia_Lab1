package com.miniapp.authapp.service;

import com.miniapp.authapp.dto.*;
import com.miniapp.authapp.entity.User;
import com.miniapp.authapp.repository.UserRepository;
import com.miniapp.authapp.security.TokenProvider;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.UUID;

@Service
@AllArgsConstructor

public class AuthService {
    private final UserRepository userRepository;
    private final TokenProvider tokenProvider;
    private final BCryptPasswordEncoder encoder;

    public AuthResponse registerUser(RegisterRequest req) {
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        User user = new User();
        user.setUserId(UUID.randomUUID().toString());
        user.setFullName(req.getName());
        user.setEmail(req.getEmail());
        user.setPasswordHash(encoder.encode(req.getPassword()));
        user.setCreatedAt(new Date());

        userRepository.save(user);

        // Auto-login: generate token immediately
        String token = tokenProvider.generateToken(user.getEmail());
        UserDTO userDto = new UserDTO(user.getEmail(), user.getFullName(), user.getCreatedAt());

        return new AuthResponse("Registration successful!", token, userDto);
    }

    public AuthResponse authenticateUser(LoginRequest req) {
        User user = userRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if (!encoder.matches(req.getPassword(), user.getPasswordHash())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = tokenProvider.generateToken(user.getEmail());
        UserDTO userDto = new UserDTO(user.getEmail(), user.getFullName(), user.getCreatedAt());

        return new AuthResponse("Login successful!", token, userDto);
    }
}