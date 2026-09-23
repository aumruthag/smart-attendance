const API_BASE_URL = "http://localhost:8080/api";


async function request(
    endpoint,
    options = {}
) {

    const response = await fetch(
        `${API_BASE_URL}${endpoint}`,
        {
            ...options,

            credentials: "include",

            headers: {
                "Content-Type": "application/json",
                ...(options.headers || {})
            }
        }
    );


    let data = null;

    try {

        data = await response.json();

    } catch {

        data = null;
    }


    if (!response.ok) {

        const message =
            data?.message ||
            "Something went wrong";

        throw new Error(message);
    }


    return data;
}


/*
 * LOGIN
 */
export function login(
    email,
    password
) {

    return request(
        "/auth/login",
        {
            method: "POST",

            body: JSON.stringify({
                email,
                password
            })
        }
    );
}


/*
 * LOGOUT
 */
export function logout() {

    return request(
        "/auth/logout",
        {
            method: "POST"
        }
    );
}


/*
 * CHECK CURRENT SESSION
 */
export function getSession() {

    return request(
        "/auth/session"
    );
}


/*
 * MARK ATTENDANCE
 */
export function markAttendance(
    latitude,
    longitude
) {

    return request(
        "/attendance/check-in",
        {
            method: "POST",

            body: JSON.stringify({
                latitude,
                longitude
            })
        }
    );
}


/*
 * GET ATTENDANCE HISTORY
 */
export function getAttendanceHistory() {

    return request(
        "/attendance/history"
    );
}


/*
 * SUBMIT LEAVE / PERMISSION REQUEST
 */
export function submitLeaveRequest(
    requestDate,
    requestType,
    reason
) {

    return request(
        "/leave",
        {
            method: "POST",

            body: JSON.stringify({
                requestDate,
                requestType,
                reason
            })
        }
    );
}


/*
 * GET STAFF'S OWN LEAVE REQUESTS
 */
export function getMyLeaveRequests() {

    return request(
        "/leave/my-requests"
    );
}


/*
 * HOD - GET ALL REQUESTS
 */
export function getAllLeaveRequests() {

    return request(
        "/leave/all"
    );
}


/*
 * HOD - UPDATE REQUEST STATUS
 */
export function updateLeaveStatus(
    id,
    status
) {

    return request(
        `/leave/${id}/status`,
        {
            method: "PUT",

            body: JSON.stringify({
                status
            })
        }
    );
}