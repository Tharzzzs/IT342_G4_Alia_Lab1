package com.miniapp.authapp.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import lombok.Data;
import java.util.Date;

@Entity
@Table(name = "users")
@Data
public class User {

    @Id
    @Column(name = "user_id")
    private String userId;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "created_at")
    private Date createdAt = new Date();
}