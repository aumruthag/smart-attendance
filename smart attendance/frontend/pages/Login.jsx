import { useState } from "react";

import { login } from "../api";


function Login({
    onLogin
}) {

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");


    async function handleSubmit(
        event
    ) {

        event.preventDefault();

        setLoading(true);

        setError("");


        try {

            const user =
                await login(
                    email,
                    password
                );


            onLogin(user);

        } catch (err) {

            setError(
                err.message
            );

        } finally {

            setLoading(false);
        }
    }


    return (

        <div className="login-page">

            <div className="login-card">

                <div className="login-header">

                    <div className="app-logo">
                        SA
                    </div>

                    <h1>
                        Smart Attendance
                    </h1>

                    <p>
                        Staff Attendance Management System
                    </p>

                </div>


                <form
                    onSubmit={handleSubmit}
                    className="form"
                >

                    <div className="form-group">

                        <label>
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(event) =>
                                setEmail(
                                    event.target.value
                                )
                            }
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(event) =>
                                setPassword(
                                    event.target.value
                                )
                            }
                            required
                        />

                    </div>


                    {error && (

                        <div className="error-message">

                            {error}

                        </div>

                    )}


                    <button
                        type="submit"
                        className="primary-button login-button"
                        disabled={loading}
                    >

                        {loading
                            ? "Signing in..."
                            : "Sign In"
                        }

                    </button>

                </form>


                <div className="demo-credentials">

                    <p>
                        <strong>Demo Staff</strong>
                    </p>

                    <p>
                        staff@smartattendance.com
                    </p>

                    <p>
                        Password: staff123
                    </p>

                    <hr />

                    <p>
                        <strong>Demo HOD</strong>
                    </p>

                    <p>
                        hod@smartattendance.com
                    </p>

                    <p>
                        Password: hod123
                    </p>

                </div>

            </div>

        </div>
    );
}


export default Login;