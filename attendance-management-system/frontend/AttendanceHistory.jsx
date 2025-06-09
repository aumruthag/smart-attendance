import React, { useEffect, useState } from "react";

function AttendanceHistory() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/attendance/list")
      .then((res) => res.json())
      .then((data) => {
        setRecords(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
    <div className="container attendance-list">
      <h3>Attendance History</h3>
      {loading ? (
        <p>Loading records...</p>
      ) : records.length === 0 ? (
        <p>No attendance records found.</p>
      ) : (
        records.map((record) => (
          <div key={record.id} className="attendance-item">
            <strong>{record.staff.name}</strong>
             {record.date} at {record.time} 
            
            {record.status}
          </div>
        ))
      )}
    </div>
    </>
  );
}

export default AttendanceHistory;
