package com.miniapp.authapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.util.Date;

@Data
@AllArgsConstructor
public class UserDTO {
    private String email;
    private String fullName;
    private Date createdAt;
}