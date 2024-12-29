import React, { useState, useEffect } from 'react';
import './Alert.css'; // Custom CSS for styling the alert page

// Simulate fetching real-time alerts (Replace with actual API call)
const fetchAlerts = async () => {
  return [
    { id: 1, type: 'Weather', message: 'Heavy Rain expected in Jharkhand', level: 'warning', timestamp: '2024-09-14T14:00:00' },
    { id: 2, type: 'Seismic', message: 'Seismic activity detected near Dhanbad', level: 'danger', timestamp: '2024-09-14T13:30:00' },
    { id: 3, type: 'Equipment', message: 'Excavator malfunction at Sector A3', level: 'danger', timestamp: '2024-09-14T12:15:00' },
    { id: 4, type: 'Air Quality', message: 'Dust levels high in Mine Shaft 2', level: 'warning', timestamp: '2024-09-14T11:45:00' },
    { id: 5, type: 'Power', message: 'Scheduled power outage for maintenance', level: 'info', timestamp: '2024-09-14T10:00:00' },
    { id: 6, type: 'Worker Shift', message: 'Shift change alert: Team B to replace Team A', level: 'info', timestamp: '2024-09-14T09:00:00' },
  ];
};

// Safety guidelines based on the type of alert
const SafetyGuidelines = ({ alert }) => {
  const guidelines = {
    'Weather': 'Move to higher ground if flooding occurs. Avoid working near mine pits during rainstorms.',
    'Seismic': 'Evacuate the mine immediately. Gather at designated safe zones and await further instructions.',
    'Equipment': 'Ensure proper machinery maintenance protocols. Isolate faulty equipment and notify maintenance team.',
    'Air Quality': 'All workers should wear respirators. Minimize time spent in the affected area and ensure ventilation.',
    'Power': 'Backup generators will activate. Avoid using heavy machinery during the power outage.',
    'Worker Shift': 'Team B workers should report to the main assembly point. Team A should log off and submit reports.',
  };

  return (
    <div className="guidelines">
      <h4>Safety Guidelines:</h4>
      <p>{guidelines[alert.type] || 'Follow standard mining safety procedures.'}</p>
    </div>
  );
};

// Component to display the alert dashboard
const AlertDashboard = ({ alerts }) => {
  return (
    <div className="alert-dashboard">
      {alerts.map(alert => (
        <div key={alert.id} className={`alert-card ${alert.level}`}>
          <h3>{alert.type} Alert</h3>
          <p>{alert.message}</p>
          <p><strong>Time:</strong> {new Date(alert.timestamp).toLocaleString()}</p>
          <SafetyGuidelines alert={alert} />
        </div>
      ))}
    </div>
  );
};

// Main Alert Component
const Alert = () => {
  const [alerts, setAlerts] = useState([]);
  const [language, setLanguage] = useState('en');
  const [history, setHistory] = useState([]);
  const [showAllHistory, setShowAllHistory] = useState(false); // Toggle for showing full history
  const [filterValue, setFilterValue] = useState(1); // State for filtering by minutes/hours
  const [filterUnit, setFilterUnit] = useState('minutes'); // Unit of time (minutes or hours)

  useEffect(() => {
    const loadAlerts = async () => {
      const newAlerts = await fetchAlerts();
      setAlerts(newAlerts);
      setHistory(prevHistory => [...prevHistory, ...newAlerts]); // Log alert history
    };

    loadAlerts();

    const intervalId = setInterval(loadAlerts, 60000); // Fetch alerts every minute
    return () => clearInterval(intervalId);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  const getAlertMessage = (message) => {
    const translations = {
      'Heavy Rain expected in Jharkhand': 'झारखंड में भारी बारिश की उम्मीद है',
      'Seismic activity detected near Dhanbad': 'धनबाद के पास भूकंपीय गतिविधि का पता चला',
      'Excavator malfunction at Sector A3': 'सेक्टर A3 में खुदाई मशीन खराब हो गई',
      'Dust levels high in Mine Shaft 2': 'माइन शाफ्ट 2 में धूल का स्तर अधिक है',
      'Scheduled power outage for maintenance': 'रखरखाव के लिए निर्धारित बिजली कटौती',
      'Shift change alert: Team B to replace Team A': 'शिफ्ट परिवर्तन: टीम A को टीम B द्वारा प्रतिस्थापित किया जाएगा',
    };

    return language === 'hi' ? translations[message] || message : message;
  };

  // Toggle the display of the full alert history
  const handleReadAllClick = () => {
    setShowAllHistory(!showAllHistory);
  };

  // Filter logic for history based on selected filter (in minutes or hours)
  const filteredHistory = history.filter(alert => {
    const alertTime = new Date(alert.timestamp);
    const now = new Date();
    const filterAgo = new Date(now - filterValue * (filterUnit === 'hours' ? 60 * 60 * 1000 : 60 * 1000));
    return alertTime > filterAgo;
  });

  return (
    <div className="alert-page">
      <header>
        <h1>{language === 'en' ? 'Mining Alerts' : 'खनन अलर्ट'}</h1>
        <button onClick={toggleLanguage}>
          {language === 'en' ? 'Switch to Hindi' : 'Switch to English'}
        </button>
      </header>

      <section>
        <h2>{language === 'en' ? 'Active Alerts' : 'सक्रिय अलर्ट'}</h2>
        {alerts.length > 0 ? (
          <AlertDashboard alerts={alerts.map(alert => ({
            ...alert,
            message: getAlertMessage(alert.message)
          }))} />
        ) : (
          <p>{language === 'en' ? 'No active alerts at this time.' : 'इस समय कोई सक्रिय अलर्ट नहीं है।'}</p>
        )}
      </section>

      <section className="alert-history">
        <button onClick={handleReadAllClick} className="read-all-button">
          {showAllHistory
            ? language === 'en' ? 'Hide History' : 'इतिहास छुपाएं'
            : language === 'en' ? 'Read All History' : 'सभी इतिहास पढ़ें'}
        </button>

        <h2>{language === 'en' ? 'Alert History' : 'अलर्ट इतिहास'}</h2>

        {/* Filter options */}
        <label htmlFor="filterValue">{language === 'en' ? 'Filter by time:' : 'समय के अनुसार फ़िल्टर करें:'}</label>
        <input
          type="number"
          id="filterValue"
          value={filterValue}
          onChange={(e) => setFilterValue(Number(e.target.value))} // Parse the value as a number
          min="1"
        />
        <select id="filterUnit" value={filterUnit} onChange={(e) => setFilterUnit(e.target.value)}>
          <option value="minutes">{language === 'en' ? 'Minutes' : 'मिनट'}</option>
          <option value="hours">{language === 'en' ? 'Hours' : 'घंटे'}</option>
        </select>

        {/* Display filtered history */}
        <ul className="history-list">
          {filteredHistory.slice(0, showAllHistory ? filteredHistory.length : 5).map(alert => (
            <li key={alert.id} className="history-item">
              <span className="history-time">{new Date(alert.timestamp).toLocaleString()}</span>
              <span className="history-message">{getAlertMessage(alert.message)}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Alert;
