package com.smartattendance.controller;

import com.smartattendance.dto.LoginRequest;
import com.smartattendance.dto.LoginResponse;
import com.smartattendance.service.AuthService;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;


    public AuthController(
            AuthService authService
    ) {
        this.authService = authService;
    }


    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @Valid @RequestBody LoginRequest request,
            HttpSession session
    ) {

        LoginResponse response =
                authService.login(request);


        /*
         * Store authenticated user information
         * in the server-side session.
         */
        session.setAttribute(
                "staffId",
                response.id()
        );

        session.setAttribute(
                "role",
                response.role()
        );

        session.setAttribute(
                "name",
                response.name()
        );


        return ResponseEntity.ok(response);
    }


    @PostMapping("/logout")
    public ResponseEntity<String> logout(
            HttpSession session
    ) {

        session.invalidate();

        return ResponseEntity.ok(
                "Logged out successfully"
        );
    }


    @GetMapping("/session")
    public ResponseEntity<LoginResponse> getSession(
            HttpSession session
    ) {

        Object staffIdObject =
                session.getAttribute("staffId");


        if (staffIdObject == null) {

            return ResponseEntity
                    .status(401)
                    .build();
        }


        return ResponseEntity.ok(
                new LoginResponse(
                        (Long) staffIdObject,
                        (String) session.getAttribute("name"),
                        null,
                        (String) session.getAttribute("role"),
                        null
                )
        );
    }
}