import React, { useState } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [shiftComplianceRate, setShiftComplianceRate] = useState('9%');
  const [incidentReportRate, setIncidentReportRate] = useState('$1.432');
  const [workersByShift, setWorkersByShift] = useState('[Chart]');
  const [safetyExpenses, setSafetyExpenses] = useState([
    { label: 'Training Costs', value: '$34,566.23' },
    { label: 'Equipment Maintenance', value: '$45,000.21' },
  ]);
  const [safetyAnnouncements, setSafetyAnnouncements] = useState([
    'Daily Safety Reminders',
    'Safety Committee Meeting',
    'Shift Safety Briefing',
    'Safety Drill Schedule',
  ]);
  const [incidentLog, setIncidentLog] = useState([
    '10:04 AM, Mon, Sept. 10, 2021 - New Incident Reported',
    '10:00 AM, Mon, Sept. 10, 2021 - Safety Alert Issued',
  ]);
  const [safetyPerformanceMetrics, setSafetyPerformanceMetrics] = useState(
    '[Performance Metrics]'
  );

  const [editing, setEditing] = useState({
    shiftComplianceRate: false,
    incidentReportRate: false,
    workersByShift: false,
    safetyExpenses: false,
    safetyPerformanceMetrics: false,
    safetyAnnouncements: false,
    incidentLog: false,
  });

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
    if (field === 'workersByShift') {
      setWorkersByShift(newValue);
    }
    if (field === 'performanceMetrics') {
      setSafetyPerformanceMetrics(newValue);
    }
    if (field === 'announcements') {
      const updatedAnnouncements = [...safetyAnnouncements];
      updatedAnnouncements[index] = newValue;
      setSafetyAnnouncements(updatedAnnouncements);
    }
    if (field === 'incidentLog') {
      const updatedIncidentLog = [...incidentLog];
      updatedIncidentLog[index] = newValue;
      setIncidentLog(updatedIncidentLog);
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
  };

  const addExpense = () => {
    setSafetyExpenses([...safetyExpenses, { label: 'New Expense', value: '' }]);
    setEditing((prev) => ({ ...prev, safetyExpenses: true }));
  };

  const deleteExpense = (index) => {
    setSafetyExpenses(safetyExpenses.filter((_, i) => i !== index));
  };

  const addAnnouncement = () => {
    setSafetyAnnouncements([...safetyAnnouncements, 'New Announcement']);
    setEditing((prev) => ({ ...prev, safetyAnnouncements: true }));
  };

  const deleteAnnouncement = (index) => {
    setSafetyAnnouncements(safetyAnnouncements.filter((_, i) => i !== index));
  };

  const addIncident = () => {
    setIncidentLog([...incidentLog, 'New Incident']);
    setEditing((prev) => ({ ...prev, incidentLog: true }));
  };

  const deleteIncident = (index) => {
    setIncidentLog(incidentLog.filter((_, i) => i !== index));
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <ul>
          <li>Safety Dashboard</li>
          <li>Shift Logs</li>
          <li>Workers</li>
          <li>Shift Attendance</li>
          <li>Compliance Metrics</li>
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
2
          <div className="workers-by-shift">shift
            <h3>Workers by Shift</h3>
            <textarea
              value={workersByShift}
              onChange={(e) => handleChange('workersByShift', e)}
              disabled={!editing.workersByShift}
              className="editable-field"
            />
            {!editing.workersByShift && (
              <button onClick={() => handleEdit('workersByShift')}>Edit</button>
            )}
            {editing.workersByShift && (
              <button onClick={() => handleSave('workersByShift')}>Save</button>
            )}
          </div>

          <div className="safety-expenses">
            <h3>Safety Expenses Overview</h3>
            {safetyExpenses.map((expense, index) => (
              <div className="expense-item" key={index}>
                <input
                  type="text"
                  value={expense.label}
                  onChange={(e) => handleChange('expenses', e, index, 'label')}
                  disabled={!editing.safetyExpenses}
                  className="editable-field"
                />
                <input
                  type="text"
                  value={expense.value}
                  onChange={(e) => handleChange('expenses', e, index)}
                  disabled={!editing.safetyExpenses}
                  className="editable-field"
                />
                {editing.safetyExpenses && (
                  <>
                    <button onClick={() => deleteExpense(index)}>Delete</button>
                  </>
                )}
              </div>
            ))}
            <button onClick={addExpense}>Add Expense</button>
            {editing.safetyExpenses && (
              <button onClick={() => handleSave('safetyExpenses')}>Save</button>
            )}
          </div>

          <div className="safety-performance">
            <h3>Safety Performance Metrics</h3>
            <textarea
              value={safetyPerformanceMetrics}
              onChange={(e) => handleChange('performanceMetrics', e)}
              disabled={!editing.safetyPerformanceMetrics}
              className="editable-field"
            />
            {!editing.safetyPerformanceMetrics && (
              <button onClick={() => handleEdit('safetyPerformanceMetrics')}>Edit</button>
            )}
            {editing.safetyPerformanceMetrics && (
              <button onClick={() => handleSave('safetyPerformanceMetrics')}>Save</button>
            )}
          </div>
        </section>

        <section className="side-announcements">
          <h3>Safety Announcements</h3>
          {safetyAnnouncements.map((announcement, index) => (
            <div key={index} className="announcement-item">
              <input
                type="text"
                value={announcement}
                onChange={(e) => handleChange('announcements', e, index)}
                disabled={!editing.safetyAnnouncements}
                className="editable-field"
              />
              {editing.safetyAnnouncements && (
                <>
                  <button onClick={() => deleteAnnouncement(index)}>Delete</button>
                </>
              )}
            </div>
          ))}
          <button onClick={addAnnouncement}>Add Announcement</button>
          {editing.safetyAnnouncements && (
            <button onClick={() => handleSave('safetyAnnouncements')}>Save</button>
          )}
        </section>

        <section className="incident-log">
          <h3>Incident Log</h3>
          <div className="incident-log-container">
            {incidentLog.map((log, index) => (
              <div
                key={index}
                className="incident-log-item"
              >
                <input
                  type="text"
                  value={log}
                  onChange={(e) => handleChange('incidentLog', e, index)}
                  disabled={!editing.incidentLog}
                  className="editable-field"
                />
                {editing.incidentLog && (
                  <>
                    <button onClick={() => deleteIncident(index)}>Delete</button>
                  </>
                )}
              </div>
            ))}
          </div>
          <button onClick={addIncident}>Add Incident</button>
          {editing.incidentLog && (
            <button onClick={() => handleSave('incidentLog')}>Save</button>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;