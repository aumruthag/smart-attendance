package com.smartattendance.service;

import com.smartattendance.dto.LoginRequest;
import com.smartattendance.dto.LoginResponse;
import com.smartattendance.entity.Staff;
import com.smartattendance.repository.StaffRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final StaffRepository staffRepository;

    private final PasswordEncoder passwordEncoder;


    public AuthService(
            StaffRepository staffRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.staffRepository = staffRepository;
        this.passwordEncoder = passwordEncoder;
    }


    public LoginResponse login(LoginRequest request) {

        Staff staff = staffRepository
                .findByEmail(request.email())
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Invalid email or password"
                        )
                );


        boolean passwordMatches =
                passwordEncoder.matches(
                        request.password(),
                        staff.getPassword()
                );


        if (!passwordMatches) {

            throw new IllegalArgumentException(
                    "Invalid email or password"
            );
        }


        return new LoginResponse(
                staff.getId(),
                staff.getName(),
                staff.getEmail(),
                staff.getRole(),
                staff.getDepartment()
        );
    }
}