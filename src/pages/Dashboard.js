import React, { useState, useEffect } from 'react';
import { Bar, Pie, Line, Doughnut, Radar } from 'react-chartjs-2';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import 'chart.js/auto';
import './Dashboard.css';

const Dashboard = () => {
  const [shiftComplianceRate, setShiftComplianceRate] = useState('9%');
  const [incidentReportRate, setIncidentReportRate] = useState('$1.432');
  const [safetyExpenses, setSafetyExpenses] = useState([
    { label: 'Training Costs', value: '$34,566.23' },
    { label: 'Equipment Maintenance', value: '$45,000.21' },
  ]);
  const [incidentLogs, setIncidentLogs] = useState([
    { label: 'Incident 1', value: 'Resolved' },
    { label: 'Incident 2', value: 'Pending' },
  ]);
  const [announcements, setAnnouncements] = useState([
    { label: 'Holiday Notice', value: 'Sep 10, 2024' },
    { label: 'Safety Meeting', value: 'Sep 12, 2024' },
  ]);

  const [editing, setEditing] = useState({
    shiftComplianceRate: false,
    incidentReportRate: false,
    safetyExpenses: false,
    incidentLogs: false,
    announcements: false,
  });

  // Function to generate random data
  const generateRandomData = () => {
    setShiftComplianceRate(`${Math.floor(Math.random() * 100)}%`);
    setIncidentReportRate(`$${(Math.random() * 2).toFixed(3)}`);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      generateRandomData();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const handleEdit = (field) => {
    setEditing((prev) => ({ ...prev, [field]: true }));
  };

  const handleSave = (field) => {
    setEditing((prev) => ({ ...prev, [field]: false }));
  };

  const handleChange = (field, e, index = null, subField = null) => {
    const newValue = e.target.value;
    if (field === 'shiftComplianceRate') {
      setShiftComplianceRate(newValue);
    }
    if (field === 'incidentReportRate') {
      setIncidentReportRate(newValue);
    }
    if (field === 'expenses') {
      const updatedExpenses = [...safetyExpenses];
      if (subField === 'label') {
        updatedExpenses[index].label = newValue;
      } else {
        updatedExpenses[index].value = newValue;
      }
      setSafetyExpenses(updatedExpenses);
    }
    if (field === 'incidentLogs') {
      const updatedLogs = [...incidentLogs];
      if (subField === 'label') {
        updatedLogs[index].label = newValue;
      } else {
        updatedLogs[index].value = newValue;
      }
      setIncidentLogs(updatedLogs);
    }
    if (field === 'announcements') {
      const updatedAnnouncements = [...announcements];
      if (subField === 'label') {
        updatedAnnouncements[index].label = newValue;
      } else {
        updatedAnnouncements[index].value = newValue;
      }
      setAnnouncements(updatedAnnouncements);
    }
  };

  const addExpense = () => {
    setSafetyExpenses([...safetyExpenses, { label: 'New Expense', value: '' }]);
    setEditing((prev) => ({ ...prev, safetyExpenses: true }));
  };

  const deleteExpense = (index) => {
    setSafetyExpenses(safetyExpenses.filter((_, i) => i !== index));
  };

  const addIncidentLog = () => {
    setIncidentLogs([...incidentLogs, { label: 'New Incident', value: '' }]);
    setEditing((prev) => ({ ...prev, incidentLogs: true }));
  };

  const deleteIncidentLog = (index) => {
    setIncidentLogs(incidentLogs.filter((_, i) => i !== index));
  };

  const addAnnouncement = () => {
    setAnnouncements([...announcements, { label: 'New Announcement', value: '' }]);
    setEditing((prev) => ({ ...prev, announcements: true }));
  };

  const deleteAnnouncement = (index) => {
    setAnnouncements(announcements.filter((_, i) => i !== index));
  };

  // Data for the charts
  const barData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Shift Compliance Rate',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const pieData = {
    labels: ['Training Costs', 'Equipment Maintenance'],
    datasets: [
      {
        data: [34566.23, 45000.21],
        backgroundColor: ['#FF6384', '#36A2EB'],
      },
    ],
  };

  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Incident Reports',
        data: [12, 19, 3, 5, 2, 3, 9],
        borderColor: 'rgba(255,99,132,1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
    ],
  };

  const doughnutData = {
    labels: ['Electrical', 'Mechanical', 'Human Error', 'Other'],
    datasets: [
      {
        data: [20, 15, 40, 25],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };

  const radarData = {
    labels: ['Compliance', 'Efficiency', 'Safety', 'Cost'],
    datasets: [
      {
        label: 'Safety Performance Metrics',
        data: [2, 3, 4, 5],
        backgroundColor: 'rgba(179,181,198,0.2)',
        borderColor: 'rgba(179,181,198,1)',
        pointBackgroundColor: 'rgba(179,181,198,1)',
      },
    ],
  };

  const coalMinesData = {
    labels: ['2016', '2017', '2018', '2019', '2020', '2021'],
    datasets: [
      {
        label: 'Number of Coal Mines in India',
        data: [450, 470, 465, 480, 490, 495],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <ul>
          <li>
            <Link to="/">Home</Link> {/* Link to Home Page */}
          </li>
          <li>
            <Link to="/dashboard">Safety Dashboard</Link> {/* Link to Safety Dashboard */}
          </li>
          <li>
            <Link to="/attendance-logbook">Attendance Logbook</Link> {/* Link to Attendance Report */}
          </li>
          <li>
            <Link to="/safety-guidelines">Safety Guidelines</Link> {/* Link to Safety Guidelines */}
          </li>
          <li>
            <Link to="/faq">FAQ</Link> {/* Link to FAQ */}
          </li>
        </ul>
      </aside>
      <main className="main-content">
        <section className="safety-dashboard">
          <div className="dashboard-overview">
            <div className="overview-item">
              <h3>Shift Compliance Rate</h3>
              <input
                type="text"
                value={shiftComplianceRate}
                onChange={(e) => handleChange('shiftComplianceRate', e)}
                disabled={!editing.shiftComplianceRate}
                className="editable-field"
              />
              {!editing.shiftComplianceRate && (
                <button onClick={() => handleEdit('shiftComplianceRate')}>Edit</button>
              )}
              {editing.shiftComplianceRate && (
                <button onClick={() => handleSave('shiftComplianceRate')}>Save</button>
              )}
            </div>
            <div className="overview-item">
              <h3>Incident Report Rate</h3>
              <input
                type="text"
                value={incidentReportRate}
                onChange={(e) => handleChange('incidentReportRate', e)}
                disabled={!editing.incidentReportRate}
                className="editable-field"
              />
              {!editing.incidentReportRate && (
                <button onClick={() => handleEdit('incidentReportRate')}>Edit</button>
              )}
              {editing.incidentReportRate && (
                <button onClick={() => handleSave('incidentReportRate')}>Save</button>
              )}
            </div>
          </div>

          <div className="chart-container">
            <div className="chart-item">
              <h3>Bar Chart - Shift Compliance Rate</h3>
              <Bar data={barData} options={{ maintainAspectRatio: false }} />
            </div>
            <div className="chart-item">
              <h3>Pie Chart - Safety Expenses</h3>
              <Pie data={pieData} options={{ maintainAspectRatio: false }} />
            </div>
            <div className="chart-item">
              <h3>Line Chart - Incident Reports</h3>
              <Line data={lineData} options={{ maintainAspectRatio: false }} />
            </div>
            <div className="chart-item">
              <h3>Doughnut Chart - Incident Types</h3>
              <Doughnut data={doughnutData} options={{ maintainAspectRatio: false }} />
            </div>
            <div className="chart-item">
              <h3>Radar Chart - Safety Performance Metrics</h3>
              <Radar data={radarData} options={{ maintainAspectRatio: false }} />
            </div>
            <div className="chart-item">
              <h3>Bar Chart - Coal Mines in India</h3>
              <Bar data={coalMinesData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
        </section>

        <section className="safety-expenses">
          <h3>Safety Expenses</h3>
          {safetyExpenses.map((expense, index) => (
            <div key={index} className="expense-item">
              <input
                type="text"
                value={expense.label}
                onChange={(e) => handleChange('expenses', e, index, 'label')}
                disabled={!editing.safetyExpenses}
                placeholder="Expense Label"
              />
              <input
                type="text"
                value={expense.value}
                onChange={(e) => handleChange('expenses', e, index, 'value')}
                disabled={!editing.safetyExpenses}
                placeholder="Expense Value"
              />
              <button onClick={() => deleteExpense(index)}>Delete</button>
            </div>
          ))}
          <button className="add-button" onClick={addExpense}>Add Expense</button>
        </section>

        {/* Incident Log Section */}
        <section className="incident-logs">
          <h3>Incident Logs</h3>
          {incidentLogs.map((log, index) => (
            <div key={index} className="incident-item">
              <input
                type="text"
                value={log.label}
                onChange={(e) => handleChange('incidentLogs', e, index, 'label')}
                disabled={!editing.incidentLogs}
                placeholder="Incident Label"
              />
              <input
                type="text"
                value={log.value}
                onChange={(e) => handleChange('incidentLogs', e, index, 'value')}
                disabled={!editing.incidentLogs}
                placeholder="Incident Status"
              />
              <button onClick={() => deleteIncidentLog(index)}>Delete</button>
            </div>
          ))}
          <button className="add-button" onClick={addIncidentLog}>Add Incident Log</button>
        </section>

        {/* Announcements Section */}
        <section className="announcements">
          <h3>Announcements</h3>
          {announcements.map((announcement, index) => (
            <div key={index} className="announcement-item">
              <input
                type="text"
                value={announcement.label}
                onChange={(e) => handleChange('announcements', e, index, 'label')}
                disabled={!editing.announcements}
                placeholder="Announcement Title"
              />
              <input
                type="text"
                value={announcement.value}
                onChange={(e) => handleChange('announcements', e, index, 'value')}
                disabled={!editing.announcements}
                placeholder="Announcement Date"
              />
              <button onClick={() => deleteAnnouncement(index)}>Delete</button>
            </div>
          ))}
          <button className="add-button" onClick={addAnnouncement}>Add Announcement</button>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
