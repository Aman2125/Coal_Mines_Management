import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './FrontPage.css'; // Import the CSS file for styling

const FrontPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="frontpage-container">
      <nav className="main-nav">
        <div className="nav-logo">
          <h1>CarbonX</h1>
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/attendance">Attendance Report</Link></li>
          <li><Link to="/safety-guidelines">Safety Guidelines</Link></li>
          <li><Link to="/new-registration">New Registration</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/FAQ">FAQ</Link></li>
        </ul>
      </nav>

      <div className="frontpage-content">
        <div className="card-container">
          <div className="card">
            <h2>Shift Wise Record</h2>
            <p>Manage and view shift-wise records efficiently.</p>
            <Link to="/MonthYearSelector" className="card-link">View Record</Link>
          </div>
          <div className="card">
            <h2>Log Record Detailed</h2>
            <p>Access detailed log records for in-depth analysis.</p>
            <Link to="/attendance-logbook" className="card-link">View Log</Link>
          </div>
          <div className="card">
            <h2>Record Updated Safety</h2>
            <p>Check and update records related to safety compliance.</p>
            <Link to="/MachineryMaintenance" className="card-link">Update Safety</Link>
          </div>
          <div className="card">
            <h2>Claim report Page</h2>
            <p>You can report claim for any error from supervisor.</p>
            <Link to="/Home-Page" className="card-link">Claim Report</Link>
          </div>
        </div>
        <div className="info-card">
          <h1>Manage Your Log Book with Precision and Safety Compliance</h1>
          <p>Ensure adherence to DGMS guidelines for safety and record-keeping.</p>
          <div className="buttons">
            <Link to="/start" className="btn">Start Now</Link>
            <Link to="/schedule-demo" className="btn">Schedule Demo</Link>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-links">
            <Link to="/">Home</Link>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-of-service">Terms of Service</Link>
          </div>
          <div className="footer-info">
            <p>&copy; {new Date().getFullYear()} CarbonX. All rights reserved.</p>
            <p>1234 Carbon Lane, Suite 100, City, Country</p>
            <p>Email: support@carbonx.com | Phone: (123) 456-7890</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FrontPage;
