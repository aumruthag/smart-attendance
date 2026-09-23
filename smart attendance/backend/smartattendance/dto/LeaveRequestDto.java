package com.smartattendance.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record LeaveRequestDto(

        @NotNull(message = "Request date is required")
        LocalDate requestDate,

        @NotBlank(message = "Request type is required")
        String requestType,

        @NotBlank(message = "Reason is required")
        String reason
) {
}