package com.smartattendance.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "location_config")
public class LocationConfig {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(nullable = false)
    private Double latitude;


    @Column(nullable = false)
    private Double longitude;


    @Column(nullable = false)
    private Double radiusMeters;


    public LocationConfig() {
    }


    public LocationConfig(
            Double latitude,
            Double longitude,
            Double radiusMeters
    ) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.radiusMeters = radiusMeters;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }


    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }


    public Double getRadiusMeters() {
        return radiusMeters;
    }

    public void setRadiusMeters(Double radiusMeters) {
        this.radiusMeters = radiusMeters;
    }
}