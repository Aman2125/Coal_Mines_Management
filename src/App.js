import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom';
import './App.css';
import { useState } from 'react';
import Calendar from './pages/Calendar';
import DateDetails from './pages/DateDetails';

import OperationalMetricsPage from './pages/OperationalMetricsPage'; // Newly added
import SafetyAlertsPage from './pages/SafetyAlertspage'; // Newly added
import SMP from './pages/SMP.js'; // Newly added
import DGMSGuidelinesPage from './pages/DGMSGuidelinesPage'; // Newly added
import TrackComplaintPage from './pages/TrackComplaintPage';
import HomePage from './pages/HomePage';


// Page Components
import FrontPage from './pages/FrontPage';
import LoginPage from './pages/LoginPage';
import SafetyGuidelinesPage from './pages/SafetyGuidelinesPage';
import AttendancePage from './pages/AttendancePage';
import MonthYearSelector from './pages/MonthYearSelector';
import AttendanceLogbookPage from './pages/AttendanceLogbookPage.js';
import MachineryMaintenance from './pages/MachineryMaintenance.js';
import ProfileAccessPage from './pages/ProfileAccessPage';
import Dashboard from './pages/Dashboard';
import NewRegistrationPage from './pages/NewRegistrationPage'; // Import the new page
import ClaimReportPage from './pages/ClaimReportPage';
import FAQ from './pages/FAQ.js';
function App() {
  const [dateDetails, setDateDetails] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleSaveDetails = (date, updatedDetails) => {
    setDateDetails({ ...dateDetails, [date]: updatedDetails });
    setSelectedDate(null); // Close the modal after saving
  };

  const handleClose = () => {
    setSelectedDate(null);
  };
  return (

    <>
    <Routes>
      <Route
        path="/calendar/:year/:month"
        element={
          <Calendar
            onDateClick={handleDateClick}
            dateDetails={dateDetails}
            year={new Date().getFullYear()} // replace with selected year
            month={new Date().getMonth() + 1} // replace with selected month
          />
        }
      />
    </Routes>
    {selectedDate && (
      <DateDetails
        date={selectedDate}
        details={dateDetails[selectedDate] || {}}
        onClose={handleClose}
        onSave={handleSaveDetails}
      />
    )}
  


    
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/safety-guidelines" element={<SafetyGuidelinesPage />} />
        <Route path="/attendance" element={<AttendancePage />} />
        <Route path="/MonthYearSelector" element={<MonthYearSelector />} />
        <Route path="/attendance-logbook" element={<AttendanceLogbookPage />} />
        <Route path="/profile-access" element={<ProfileAccessPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/MachineryMaintenance" element={<MachineryMaintenance />} />
        <Route path="/faq" element={<FAQ/>}/>
        <Route path="/new-registration" element={<NewRegistrationPage />} />
        {/* Add new route */}
      
      <Route path="/operational-metrics" element={<OperationalMetricsPage />} /> {/* New Route */}
      <Route path="/safety-alerts" element={<SafetyAlertsPage />} /> {/* New Route */}
      <Route path="/SMP" element={<SMP />} /> {/* New Route */}
      <Route path="/claim-report" element={<ClaimReportPage />} />
      <Route path="/track-complaints" element={<TrackComplaintPage />} />
      <Route path="/home-page" element={<HomePage />} />
      <Route path="/dgms-guidelines" element={<DGMSGuidelinesPage />} /> {/* New Route */}
          </Routes>
    </>
  );
}

export default App;
