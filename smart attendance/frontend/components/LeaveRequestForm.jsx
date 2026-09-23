import { useState } from "react";

import { submitLeaveRequest } from "../api";


function LeaveRequestForm({
    onSubmitted
}) {

    const [requestDate, setRequestDate] =
        useState("");

    const [requestType, setRequestType] =
        useState("LEAVE");

    const [reason, setReason] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [message, setMessage] =
        useState("");

    const [error, setError] =
        useState("");


    async function handleSubmit(
        event
    ) {

        event.preventDefault();

        setLoading(true);

        setMessage("");

        setError("");


        try {

            await submitLeaveRequest(
                requestDate,
                requestType,
                reason
            );


            setMessage(
                "Request submitted successfully."
            );


            setRequestDate("");

            setRequestType("LEAVE");

            setReason("");


            if (onSubmitted) {

                onSubmitted();
            }

        } catch (err) {

            setError(
                err.message
            );

        } finally {

            setLoading(false);
        }
    }


    return (

        <div className="card">

            <div className="card-header">

                <div>

                    <h2>
                        Leave / Permission Request
                    </h2>

                    <p>
                        Submit your request to the HOD
                    </p>

                </div>

            </div>


            <form
                onSubmit={handleSubmit}
                className="form"
            >

                <div className="form-group">

                    <label>
                        Request Date
                    </label>

                    <input
                        type="date"
                        value={requestDate}
                        onChange={(event) =>
                            setRequestDate(
                                event.target.value
                            )
                        }
                        required
                    />

                </div>


                <div className="form-group">

                    <label>
                        Request Type
                    </label>

                    <select
                        value={requestType}
                        onChange={(event) =>
                            setRequestType(
                                event.target.value
                            )
                        }
                    >

                        <option value="LEAVE">
                            Leave
                        </option>

                        <option value="PERMISSION">
                            Permission
                        </option>

                    </select>

                </div>


                <div className="form-group">

                    <label>
                        Reason
                    </label>

                    <textarea
                        value={reason}
                        onChange={(event) =>
                            setReason(
                                event.target.value
                            )
                        }
                        placeholder="Enter your reason"
                        rows="4"
                        required
                    />

                </div>


                <button
                    type="submit"
                    className="primary-button"
                    disabled={loading}
                >

                    {loading
                        ? "Submitting..."
                        : "Submit Request"
                    }

                </button>

            </form>


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


export default LeaveRequestForm;