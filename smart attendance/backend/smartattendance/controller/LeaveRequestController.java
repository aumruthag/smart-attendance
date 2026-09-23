package com.smartattendance.controller;

import com.smartattendance.dto.LeaveRequestDto;
import com.smartattendance.dto.StatusUpdateDto;
import com.smartattendance.entity.LeaveRequest;
import com.smartattendance.service.LeaveRequestService;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leave")
public class LeaveRequestController {

    private final LeaveRequestService leaveRequestService;


    public LeaveRequestController(
            LeaveRequestService leaveRequestService
    ) {
        this.leaveRequestService =
                leaveRequestService;
    }


    /*
     * STAFF submits leave / permission request.
     */
    @PostMapping
    public ResponseEntity<LeaveRequest> createRequest(
            @Valid @RequestBody LeaveRequestDto request,
            HttpSession session
    ) {

        Long staffId =
                getLoggedInStaffId(session);


        LeaveRequest saved =
                leaveRequestService.createRequest(
                        staffId,
                        request
                );


        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(saved);
    }


    /*
     * STAFF views their own requests.
     */
    @GetMapping("/my-requests")
    public ResponseEntity<List<LeaveRequest>>
    getMyRequests(
            HttpSession session
    ) {

        Long staffId =
                getLoggedInStaffId(session);


        return ResponseEntity.ok(
                leaveRequestService
                        .getStaffRequests(staffId)
        );
    }


    /*
     * HOD views all requests.
     */
    @GetMapping("/all")
    public ResponseEntity<List<LeaveRequest>>
    getAllRequests(
            HttpSession session
    ) {

        checkHodRole(session);


        return ResponseEntity.ok(
                leaveRequestService
                        .getAllRequests()
        );
    }


    /*
     * HOD approves or rejects a request.
     */
    @PutMapping("/{id}/status")
    public ResponseEntity<LeaveRequest>
    updateStatus(
            @PathVariable Long id,
            @Valid @RequestBody StatusUpdateDto request,
            HttpSession session
    ) {

        checkHodRole(session);


        LeaveRequest updated =
                leaveRequestService.updateStatus(
                        id,
                        request
                );


        return ResponseEntity.ok(updated);
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


    private void checkHodRole(
            HttpSession session
    ) {

        Object role =
                session.getAttribute("role");


        if (role == null
                || !"HOD".equals(role.toString())) {

            throw new IllegalStateException(
                    "Only HOD users can access this resource"
            );
        }
    }
}