package com.miniapp.authapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor

public class AuthResponse {
    private String message;
    private String token;
    private UserDTO user; // This allows React to see the user's name and date
}