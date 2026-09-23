import { useEffect, useState } from "react";

import { getAttendanceHistory } from "../api";


function AttendanceHistory() {

    const [attendance, setAttendance] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    useEffect(() => {

        loadHistory();

    }, []);


    async function loadHistory() {

        try {

            const data =
                await getAttendanceHistory();

            setAttendance(data);

        } catch (err) {

            setError(
                err.message
            );

        } finally {

            setLoading(false);
        }
    }


    function formatDate(
        date
    ) {

        return new Date(
            `${date}T00:00:00`
        ).toLocaleDateString();
    }


    function formatTime(
        dateTime
    ) {

        return new Date(
            dateTime
        ).toLocaleTimeString();
    }


    if (loading) {

        return (

            <div className="card">

                <h2>
                    Attendance History
                </h2>

                <p>
                    Loading...
                </p>

            </div>
        );
    }


    return (

        <div className="card">

            <div className="card-header">

                <div>

                    <h2>
                        Attendance History
                    </h2>

                    <p>
                        Your recent attendance records
                    </p>

                </div>

            </div>


            {error && (

                <div className="error-message">
                    {error}
                </div>

            )}


            {!error &&
                attendance.length === 0 && (

                    <div className="empty-state">

                        No attendance records found.

                    </div>
                )
            }


            {attendance.length > 0 && (

                <div className="table-container">

                    <table>

                        <thead>

                            <tr>

                                <th>
                                    Date
                                </th>

                                <th>
                                    Check-in Time
                                </th>

                                <th>
                                    Status
                                </th>

                                <th>
                                    Location
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {attendance.map(
                                (record) => (

                                    <tr
                                        key={record.id}
                                    >

                                        <td>
                                            {
                                                formatDate(
                                                    record.attendanceDate
                                                )
                                            }
                                        </td>

                                        <td>
                                            {
                                                formatTime(
                                                    record.checkInTime
                                                )
                                            }
                                        </td>

                                        <td>

                                            <span className="status-badge present">

                                                {
                                                    record.status
                                                }

                                            </span>

                                        </td>

                                        <td>

                                            {record.latitude.toFixed(5)},
                                            {" "}
                                            {record.longitude.toFixed(5)}

                                        </td>

                                    </tr>

                                )
                            )}

                        </tbody>

                    </table>

                </div>
            )}

        </div>
    );
}


export default AttendanceHistory;