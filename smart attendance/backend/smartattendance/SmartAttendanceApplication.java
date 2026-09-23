package com.smartattendance;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SmartAttendanceApplication {

    public static void main(String[] args) {

        SpringApplication.run(
                SmartAttendanceApplication.class,
                args
        );

        System.out.println("========================================");
        System.out.println(" Smart Attendance Backend Started");
        System.out.println(" http://localhost:8080");
        System.out.println("========================================");
    }
}