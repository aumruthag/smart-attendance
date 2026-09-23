import { useEffect, useState } from "react";

import Login from "./pages/Login";
import StaffDashboard from "./pages/StaffDashboard";
import HodDashboard from "./pages/HodDashboard";

import { getSession } from "./api";


function App() {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);


    useEffect(() => {

        checkSession();

    }, []);


    async function checkSession() {

        try {

            const sessionUser =
                await getSession();

            setUser(sessionUser);

        } catch {

            setUser(null);

        } finally {

            setLoading(false);
        }
    }


    function handleLogin(
        loggedInUser
    ) {

        setUser(loggedInUser);
    }


    function handleLogout() {

        setUser(null);
    }


    if (loading) {

        return (
            <div className="loading-screen">

                <div className="loading-box">

                    <div className="spinner"></div>

                    <p>
                        Loading Smart Attendance...
                    </p>

                </div>

            </div>
        );
    }


    if (!user) {

        return (
            <Login
                onLogin={handleLogin}
            />
        );
    }


    if (user.role === "HOD") {

        return (
            <HodDashboard
                user={user}
                onLogout={handleLogout}
            />
        );
    }


    return (
        <StaffDashboard
            user={user}
            onLogout={handleLogout}
        />
    );
}


export default App;