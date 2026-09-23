package com.smartattendance.repository;

import com.smartattendance.entity.Attendance;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface AttendanceRepository
        extends JpaRepository<Attendance, Long> {

    Optional<Attendance> findByStaffIdAndAttendanceDate(
            Long staffId,
            LocalDate attendanceDate
    );


    List<Attendance> findByStaffIdOrderByAttendanceDateDesc(
            Long staffId
    );
}