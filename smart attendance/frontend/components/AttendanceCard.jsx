import { useState } from "react";

import { markAttendance } from "../api";


function AttendanceCard() {

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");

    const [error, setError] = useState("");


    function handleMarkAttendance() {

        setLoading(true);

        setMessage("");

        setError("");


        if (!navigator.geolocation) {

            setError(
                "Geolocation is not supported by this browser."
            );

            setLoading(false);

            return;
        }


        navigator.geolocation.getCurrentPosition(

            async (position) => {

                try {

                    const latitude =
                        position.coords.latitude;

                    const longitude =
                        position.coords.longitude;


                    const result =
                        await markAttendance(
                            latitude,
                            longitude
                        );


                    setMessage(
                        `Attendance marked successfully at ${formatTime(result.checkInTime)}`
                    );

                } catch (err) {

                    setError(
                        err.message
                    );

                } finally {

                    setLoading(false);
                }
            },


            (geoError) => {

                let message =
                    "Unable to get your location.";


                if (
                    geoError.code ===
                    geoError.PERMISSION_DENIED
                ) {

                    message =
                        "Location permission was denied. Please allow location access.";

                } else if (
                    geoError.code ===
                    geoError.POSITION_UNAVAILABLE
                ) {

                    message =
                        "Your current location is unavailable.";

                } else if (
                    geoError.code ===
                    geoError.TIMEOUT
                ) {

                    message =
                        "Location request timed out.";
                }


                setError(message);

                setLoading(false);
            },


            {
                enableHighAccuracy: true,

                timeout: 10000,

                maximumAge: 0
            }
        );
    }


    function formatTime(
        dateTime
    ) {

        if (!dateTime) {

            return "";
        }


        return new Date(
            dateTime
        ).toLocaleTimeString();
    }


    return (

        <div className="card attendance-card">

            <div className="card-header">

                <div>

                    <h2>
                        Mark Attendance
                    </h2>

                    <p>
                        Your location will be verified
                        before attendance is recorded.
                    </p>

                </div>

                <span className="location-icon">
                    📍
                </span>

            </div>


            <button
                className="primary-button attendance-button"
                onClick={handleMarkAttendance}
                disabled={loading}
            >

                {loading
                    ? "Checking Location..."
                    : "Mark Attendance"
                }

            </button>


            {message && (

                <div className="success-message">

                    ✓ {message}

                </div>

            )}


            {error && (

                <div className="error-message">

                    {error}

                </div>

            )}

        </div>
    );
}


export default AttendanceCard;