package com.smartattendance.dto;

import jakarta.validation.constraints.NotBlank;

public record StatusUpdateDto(

        @NotBlank(message = "Status is required")
        String status
) {
}