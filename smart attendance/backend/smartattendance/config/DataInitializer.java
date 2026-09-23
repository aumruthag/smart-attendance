package com.smartattendance.config;

import com.smartattendance.entity.LocationConfig;
import com.smartattendance.entity.Staff;
import com.smartattendance.repository.LocationConfigRepository;
import com.smartattendance.repository.StaffRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initializeData(
            StaffRepository staffRepository,
            LocationConfigRepository locationConfigRepository,
            PasswordEncoder passwordEncoder
    ) {

        return args -> {


            if (staffRepository.findByEmail("staff@smartattendance.com").isEmpty()) {

                Staff staff = new Staff();

                staff.setName("Demo Staff");
                staff.setEmail("staff@smartattendance.com");

                staff.setPassword(
                        passwordEncoder.encode("staff123")
                );

                staff.setRole("STAFF");
                staff.setDepartment("Computer Science");

                staffRepository.save(staff);
            }


            
            if (staffRepository.findByEmail("hod@smartattendance.com").isEmpty()) {

                Staff hod = new Staff();

                hod.setName("Demo HOD");
                hod.setEmail("hod@smartattendance.com");

                hod.setPassword(
                        passwordEncoder.encode("hod123")
                );

                hod.setRole("HOD");
                hod.setDepartment("Computer Science");

                staffRepository.save(hod);
            }


            if (locationConfigRepository.count() == 0) {

                LocationConfig location = new LocationConfig();

                location.setLatitude(11.9416);
                location.setLongitude(79.8083);

                location.setRadiusMeters(200.0);

                locationConfigRepository.save(location);
            }

            System.out.println("Demo data initialization completed.");
        };
    }
}