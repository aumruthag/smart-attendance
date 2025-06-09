import React, { useState } from "react";

function MarkAttendance() {
  const [scanning, setScanning] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleScan = () => {
    setScanning(true);
    setMessage("");
    setError("");

    // Simulate fingerprint scan delay
    setTimeout(() => {
      // Call backend API here
      fetch("http://localhost:8080/api/attendance/mark", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ staffId: 1 }), // hardcoded staffId = 1, change as needed
      })
        .then((res) => {
          if (!res.ok) throw new Error("Server error");
          return res.json();
        })
        .then((data) => {
          setMessage("Attendance marked successfully ✅");
        })
        .catch((err) => {
          setError("Failed to mark attendance ❌");
        })
        .finally(() => setScanning(false));
    }, 2500);
  };

  return (
    <div className="container">
      <h2>Mark Your Attendance</h2>
      <button onClick={handleScan} disabled={scanning}>
        {scanning ? "🔄 Scanning..." : "🛂 Scan Fingerprint"}
      </button>
      {message && <p className="message">{message}</p>}
      {error && <p className="message error">{error}</p>}
    </div>
  );
}

export default MarkAttendance;
