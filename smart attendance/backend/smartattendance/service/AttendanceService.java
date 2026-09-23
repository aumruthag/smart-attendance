package com.smartattendance.service;

import com.smartattendance.dto.AttendanceResponse;
import com.smartattendance.entity.Attendance;
import com.smartattendance.entity.Staff;
import com.smartattendance.repository.AttendanceRepository;
import com.smartattendance.repository.StaffRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;

    private final StaffRepository staffRepository;

    private final LocationService locationService;


    public AttendanceService(
            AttendanceRepository attendanceRepository,
            StaffRepository staffRepository,
            LocationService locationService
    ) {
        this.attendanceRepository = attendanceRepository;
        this.staffRepository = staffRepository;
        this.locationService = locationService;
    }


    @Transactional
    public AttendanceResponse markAttendance(
            Long staffId,
            Double latitude,
            Double longitude
    ) {

        if (latitude == null || longitude == null) {

            throw new IllegalArgumentException(
                    "Location coordinates are required"
            );
        }


        if (latitude < -90 || latitude > 90) {

            throw new IllegalArgumentException(
                    "Invalid latitude"
            );
        }


        if (longitude < -180 || longitude > 180) {

            throw new IllegalArgumentException(
                    "Invalid longitude"
            );
        }


        Staff staff = staffRepository
                .findById(staffId)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Staff member not found"
                        )
                );


        LocalDate today = LocalDate.now();


        if (attendanceRepository
                .findByStaffIdAndAttendanceDate(
                        staffId,
                        today
                )
                .isPresent()) {

            throw new IllegalStateException(
                    "Attendance has already been marked for today"
            );
        }


        boolean insideCampus =
                locationService.isInsideCampus(
                        latitude,
                        longitude
                );


        if (!insideCampus) {

            double distance =
                    locationService.getDistanceFromCampus(
                            latitude,
                            longitude
                    );

            throw new IllegalStateException(
                    String.format(
                            "Attendance cannot be marked. " +
                            "You are approximately %.2f meters " +
                            "away from the permitted campus area.",
                            distance
                    )
            );
        }


        Attendance attendance =
                new Attendance();

        attendance.setStaff(staff);

        attendance.setAttendanceDate(today);

        attendance.setCheckInTime(
                LocalDateTime.now()
        );

        attendance.setLatitude(latitude);

        attendance.setLongitude(longitude);

        attendance.setStatus("PRESENT");


        Attendance saved =
                attendanceRepository.save(attendance);


        return convertToResponse(saved);
    }


    public List<AttendanceResponse> getStaffHistory(
            Long staffId
    ) {

        if (!staffRepository.existsById(staffId)) {

            throw new IllegalArgumentException(
                    "Staff member not found"
            );
        }


        return attendanceRepository
                .findByStaffIdOrderByAttendanceDateDesc(staffId)
                .stream()
                .map(this::convertToResponse)
                .toList();
    }


    private AttendanceResponse convertToResponse(
            Attendance attendance
    ) {

        return new AttendanceResponse(
                attendance.getId(),
                attendance.getStaff().getId(),
                attendance.getStaff().getName(),
                attendance.getAttendanceDate(),
                attendance.getCheckInTime(),
                attendance.getLatitude(),
                attendance.getLongitude(),
                attendance.getStatus()
        );
    }
}