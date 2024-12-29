import React from 'react';
import './AttendancePage.css'; // Import the CSS file for styling

const AttendancePage = () => {
  return (
    <div className="attendance-container">
      <h1 className="page-title">Attendance Records</h1>
      <div className="attendance-card-container">
        <div className="attendance-card">
          <h2 className="card-title">Labour Attendance</h2>
          <p className="card-description">
            View and manage attendance records for all labourers working on-site. Ensure accurate tracking of working hours and shifts.
          </p>
          <button className="card-button">View Records</button>
        </div>
        <div className="attendance-card">
          <h2 className="card-title">Supervisor Attendance</h2>
          <p className="card-description">
            Track the attendance of supervisors overseeing operations. Monitor their presence and working hours.
          </p>
          <button className="card-button">View Records</button>
        </div>
        <div className="attendance-card">
          <h2 className="card-title">Superintendent Attendance</h2>
          <p className="card-description">
            Manage attendance records for superintendents. Ensure they are present and track their working hours effectively.
          </p>
          <button className="card-button">View Records</button>
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;
