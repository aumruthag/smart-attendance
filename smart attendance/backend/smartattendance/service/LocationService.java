package com.smartattendance.service;

import com.smartattendance.entity.LocationConfig;
import com.smartattendance.repository.LocationConfigRepository;

import org.springframework.stereotype.Service;

@Service
public class LocationService {

    private final LocationConfigRepository locationConfigRepository;


    public LocationService(
            LocationConfigRepository locationConfigRepository
    ) {
        this.locationConfigRepository =
                locationConfigRepository;
    }


    public double calculateDistance(
            double latitude1,
            double longitude1,
            double latitude2,
            double longitude2
    ) {

        final double earthRadius = 6371000.0;

        double latitudeDifference =
                Math.toRadians(latitude2 - latitude1);

        double longitudeDifference =
                Math.toRadians(longitude2 - longitude1);


        double a =
                Math.sin(latitudeDifference / 2)
                        * Math.sin(latitudeDifference / 2)
                +
                Math.cos(Math.toRadians(latitude1))
                        * Math.cos(Math.toRadians(latitude2))
                        *
                        Math.sin(longitudeDifference / 2)
                        * Math.sin(longitudeDifference / 2);


        double c =
                2 * Math.atan2(
                        Math.sqrt(a),
                        Math.sqrt(1 - a)
                );


        return earthRadius * c;
    }


    public boolean isInsideCampus(
            double currentLatitude,
            double currentLongitude
    ) {

        LocationConfig config =
                locationConfigRepository
                        .findAll()
                        .stream()
                        .findFirst()
                        .orElseThrow(() ->
                                new IllegalStateException(
                                        "Campus location is not configured"
                                )
                        );


        double distance = calculateDistance(
                currentLatitude,
                currentLongitude,
                config.getLatitude(),
                config.getLongitude()
        );


        return distance <= config.getRadiusMeters();
    }


    public double getDistanceFromCampus(
            double currentLatitude,
            double currentLongitude
    ) {

        LocationConfig config =
                locationConfigRepository
                        .findAll()
                        .stream()
                        .findFirst()
                        .orElseThrow(() ->
                                new IllegalStateException(
                                        "Campus location is not configured"
                                )
                        );


        return calculateDistance(
                currentLatitude,
                currentLongitude,
                config.getLatitude(),
                config.getLongitude()
        );
    }
}