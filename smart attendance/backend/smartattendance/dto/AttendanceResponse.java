package com.smartattendance.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record AttendanceResponse(

        Long id,

        Long staffId,

        String staffName,

        LocalDate attendanceDate,

        LocalDateTime checkInTime,

        Double latitude,

        Double longitude,

        String status
) {
}