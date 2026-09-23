package com.smartattendance.service;

import com.smartattendance.dto.LeaveRequestDto;
import com.smartattendance.dto.StatusUpdateDto;
import com.smartattendance.entity.LeaveRequest;
import com.smartattendance.entity.Staff;
import com.smartattendance.repository.LeaveRequestRepository;
import com.smartattendance.repository.StaffRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class LeaveRequestService {

    private final LeaveRequestRepository leaveRequestRepository;

    private final StaffRepository staffRepository;


    public LeaveRequestService(
            LeaveRequestRepository leaveRequestRepository,
            StaffRepository staffRepository
    ) {
        this.leaveRequestRepository =
                leaveRequestRepository;

        this.staffRepository =
                staffRepository;
    }


    @Transactional
    public LeaveRequest createRequest(
            Long staffId,
            LeaveRequestDto request
    ) {

        Staff staff =
                staffRepository
                        .findById(staffId)
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Staff member not found"
                                )
                        );


        LeaveRequest leaveRequest =
                new LeaveRequest();

        leaveRequest.setStaff(staff);

        leaveRequest.setRequestDate(
                request.requestDate()
        );

        leaveRequest.setRequestType(
                request.requestType()
        );

        leaveRequest.setReason(
                request.reason()
        );

        leaveRequest.setStatus("PENDING");

        leaveRequest.setCreatedAt(
                LocalDateTime.now()
        );


        return leaveRequestRepository.save(
                leaveRequest
        );
    }


    public List<LeaveRequest> getStaffRequests(
            Long staffId
    ) {

        return leaveRequestRepository
                .findByStaffIdOrderByCreatedAtDesc(
                        staffId
                );
    }


    public List<LeaveRequest> getAllRequests() {

        return leaveRequestRepository
                .findAllByOrderByCreatedAtDesc();
    }


    @Transactional
    public LeaveRequest updateStatus(
            Long requestId,
            StatusUpdateDto request
    ) {

        LeaveRequest leaveRequest =
                leaveRequestRepository
                        .findById(requestId)
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Leave request not found"
                                )
                        );


        String status =
                request.status()
                        .trim()
                        .toUpperCase();


        if (!status.equals("APPROVED")
                && !status.equals("REJECTED")
                && !status.equals("PENDING")) {

            throw new IllegalArgumentException(
                    "Invalid status. Use PENDING, APPROVED or REJECTED."
            );
        }


        leaveRequest.setStatus(status);


        return leaveRequestRepository.save(
                leaveRequest
        );
    }
}