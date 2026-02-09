package com.miniapp.authapp.service;

import com.miniapp.authapp.dto.*;
import com.miniapp.authapp.entity.User;
import com.miniapp.authapp.repository.UserRepository; // New Import
import com.miniapp.authapp.security.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {
    // Inject the UserRepository instead of Firestore
    private final UserRepository userRepository;
    private final TokenProvider tokenProvider;
    private final BCryptPasswordEncoder encoder;

    public AuthResponse registerUser(RegisterRequest req) {
        // Feature 1: Check if user exists (Standard MySQL check)
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        User user = new User();
        // FRS: Map data to the User Entity
        user.setUserId(UUID.randomUUID().toString());
        user.setFullName(req.getName());
        user.setEmail(req.getEmail());
        // Security NFR: Encrypt password using BCrypt
        user.setPasswordHash(encoder.encode(req.getPassword()));
        user.setCreatedAt(new Date());

        // Save to MySQL via JPA
        userRepository.save(user);

        return new AuthResponse("Registration successful!", null);
    }

    public AuthResponse authenticateUser(LoginRequest req) {
        // Feature 2: Fetch user from MySQL
        User user = userRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        // Validate password hash
        if (!encoder.matches(req.getPassword(), user.getPasswordHash())) {
            throw new RuntimeException("Invalid credentials");
        }

        // Generate JWT Token for session management
        String token = tokenProvider.generateToken(user.getEmail());
        return new AuthResponse("Login successful!", token);
    }
}