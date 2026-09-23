import { useEffect, useState } from "react";

import AttendanceCard from "../components/AttendanceCard";
import AttendanceHistory from "../components/AttendanceHistory";
import LeaveRequestForm from "../components/LeaveRequestForm";

import {
    getMyLeaveRequests,
    logout
} from "../api";


function StaffDashboard({
    user,
    onLogout
}) {

    const [leaveRequests, setLeaveRequests] =
        useState([]);

    const [leaveLoading, setLeaveLoading] =
        useState(true);


    useEffect(() => {

        loadLeaveRequests();

    }, []);


    async function loadLeaveRequests() {

        try {

            const data =
                await getMyLeaveRequests();

            setLeaveRequests(data);

        } catch (error) {

            console.error(
                error
            );

        } finally {

            setLeaveLoading(false);
        }
    }


    async function handleLogout() {

        try {

            await logout();

        } catch (error) {

            console.error(
                error
            );

        } finally {

            onLogout();
        }
    }


    return (

        <div className="dashboard">

            <header className="topbar">

                <div>

                    <h1>
                        Smart Attendance
                    </h1>

                    <span>
                        Staff Dashboard
                    </span>

                </div>


                <div className="user-area">

                    <div className="user-info">

                        <strong>
                            {user.name}
                        </strong>

                        <small>
                            {user.department}
                        </small>

                    </div>


                    <button
                        className="logout-button"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>

            </header>


            <main className="dashboard-content">

                <section className="welcome-section">

                    <h2>
                        Welcome, {user.name}
                    </h2>

                    <p>
                        Mark your attendance from the
                        permitted campus area and manage
                        your leave or permission requests.
                    </p>

                </section>


                <div className="dashboard-grid">

                    <AttendanceCard />

                    <LeaveRequestForm
                        onSubmitted={
                            loadLeaveRequests
                        }
                    />

                </div>


                <AttendanceHistory />


                <div className="card">

                    <div className="card-header">

                        <div>

                            <h2>
                                My Leave Requests
                            </h2>

                            <p>
                                Track your submitted requests
                            </p>

                        </div>

                    </div>


                    {leaveLoading ? (

                        <p>
                            Loading requests...
                        </p>

                    ) : leaveRequests.length === 0 ? (

                        <div className="empty-state">

                            No leave or permission requests.

                        </div>

                    ) : (

                        <div className="table-container">

                            <table>

                                <thead>

                                    <tr>

                                        <th>
                                            Date
                                        </th>

                                        <th>
                                            Type
                                        </th>

                                        <th>
                                            Reason
                                        </th>

                                        <th>
                                            Status
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {leaveRequests.map(
                                        (request) => (

                                            <tr
                                                key={
                                                    request.id
                                                }
                                            >

                                                <td>
                                                    {
                                                        request.requestDate
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        request.requestType
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        request.reason
                                                    }
                                                </td>

                                                <td>

                                                    <span
                                                        className={
                                                            `status-badge ${request.status.toLowerCase()}`
                                                        }
                                                    >
                                                        {
                                                            request.status
                                                        }
                                                    </span>

                                                </td>

                                            </tr>

                                        )
                                    )}

                                </tbody>

                            </table>

                        </div>
                    )}

                </div>

            </main>

        </div>
    );
}


export default StaffDashboard;