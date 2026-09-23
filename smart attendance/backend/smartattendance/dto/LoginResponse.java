package com.smartattendance.dto;

public record LoginResponse(
        Long id,
        String name,
        String email,
        String role,
        String department
) {
}