package com.smartattendance.controller;

import com.smartattendance.dto.AttendanceResponse;
import com.smartattendance.service.AttendanceService;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.constraints.NotNull;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    private final AttendanceService attendanceService;


    public AttendanceController(
            AttendanceService attendanceService
    ) {
        this.attendanceService =
                attendanceService;
    }


    @PostMapping("/check-in")
    public ResponseEntity<AttendanceResponse> checkIn(
            @RequestBody Map<String, Double> location,
            HttpSession session
    ) {

        Long staffId =
                getLoggedInStaffId(session);


        Double latitude =
                location.get("latitude");

        Double longitude =
                location.get("longitude");


        AttendanceResponse response =
                attendanceService.markAttendance(
                        staffId,
                        latitude,
                        longitude
                );


        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }


    @GetMapping("/history")
    public ResponseEntity<List<AttendanceResponse>>
    getHistory(
            HttpSession session
    ) {

        Long staffId =
                getLoggedInStaffId(session);


        return ResponseEntity.ok(
                attendanceService.getStaffHistory(
                        staffId
                )
        );
    }


    private Long getLoggedInStaffId(
            HttpSession session
    ) {

        Object staffId =
                session.getAttribute("staffId");


        if (staffId == null) {

            throw new IllegalStateException(
                    "Please login first"
            );
        }


        return (Long) staffId;
    }
}