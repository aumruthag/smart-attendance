package com.smartattendance.repository;

import com.smartattendance.entity.LocationConfig;

import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationConfigRepository
        extends JpaRepository<LocationConfig, Long> {
}