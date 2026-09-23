package com.smartattendance.repository;

import com.smartattendance.entity.LeaveRequest;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LeaveRequestRepository
        extends JpaRepository<LeaveRequest, Long> {

    List<LeaveRequest> findByStaffIdOrderByCreatedAtDesc(
            Long staffId
    );


    List<LeaveRequest> findAllByOrderByCreatedAtDesc();
}