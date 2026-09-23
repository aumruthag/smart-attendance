import { useEffect, useState } from "react";

import {
    getAllLeaveRequests,
    updateLeaveStatus,
    logout
} from "../api";


function HodDashboard({
    user,
    onLogout
}) {

    const [requests, setRequests] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    useEffect(() => {

        loadRequests();

    }, []);


    async function loadRequests() {

        setLoading(true);

        setError("");


        try {

            const data =
                await getAllLeaveRequests();

            setRequests(data);

        } catch (err) {

            setError(
                err.message
            );

        } finally {

            setLoading(false);
        }
    }


    async function handleStatusUpdate(
        id,
        status
    ) {

        try {

            await updateLeaveStatus(
                id,
                status
            );


            await loadRequests();

        } catch (err) {

            setError(
                err.message
            );
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
                        HOD Dashboard
                    </span>

                </div>


                <div className="user-area">

                    <div className="user-info">

                        <strong>
                            {user.name}
                        </strong>

                        <small>
                            HOD
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
                        Leave & Permission Requests
                    </h2>

                    <p>
                        Review requests submitted by staff
                        members.
                    </p>

                </section>


                {error && (

                    <div className="error-message">

                        {error}

                    </div>

                )}


                <div className="card">

                    <div className="card-header">

                        <div>

                            <h2>
                                All Requests
                            </h2>

                            <p>
                                Review and update request status
                            </p>

                        </div>


                        <button
                            className="secondary-button"
                            onClick={loadRequests}
                        >
                            Refresh
                        </button>

                    </div>


                    {loading ? (

                        <div className="empty-state">

                            Loading requests...

                        </div>

                    ) : requests.length === 0 ? (

                        <div className="empty-state">

                            No requests found.

                        </div>

                    ) : (

                        <div className="table-container">

                            <table>

                                <thead>

                                    <tr>

                                        <th>
                                            Staff
                                        </th>

                                        <th>
                                            Department
                                        </th>

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

                                        <th>
                                            Action
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {requests.map(
                                        (request) => (

                                            <tr
                                                key={
                                                    request.id
                                                }
                                            >

                                                <td>
                                                    {
                                                        request.staff.name
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        request.staff.department
                                                    }
                                                </td>

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

                                                <td>

                                                    {request.status ===
                                                        "PENDING" && (

                                                        <div className="action-buttons">

                                                            <button
                                                                className="approve-button"
                                                                onClick={() =>
                                                                    handleStatusUpdate(
                                                                        request.id,
                                                                        "APPROVED"
                                                                    )
                                                                }
                                                            >
                                                                Approve
                                                            </button>


                                                            <button
                                                                className="reject-button"
                                                                onClick={() =>
                                                                    handleStatusUpdate(
                                                                        request.id,
                                                                        "REJECTED"
                                                                    )
                                                                }
                                                            >
                                                                Reject
                                                            </button>

                                                        </div>

                                                    )}

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


export default HodDashboard;