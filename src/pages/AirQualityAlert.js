import React, { useState, useEffect } from 'react';
import { FaWind, FaMask, FaExclamationTriangle, FaArrowLeft } from 'react-icons/fa';
import { WiDust } from 'react-icons/wi';
import './AirQualityAlert.css';

const API_KEY = "ee59cf9309d065963dc102cfceb15d9d"; // OpenWeatherMap API key

const AirQualityAlert = () => {
  const [airQualityData, setAirQualityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState({
    lat: 23.7957, // Dhanbad coordinates (example mining location)
    lon: 86.4304
  });

  const getAQILevel = (aqi) => {
    switch(aqi) {
      case 1: return { level: 'good', message: 'Good - Minimal Impact', color: '#4CAF50' };
      case 2: return { level: 'fair', message: 'Fair - Minor breathing discomfort to sensitive people', color: '#FFC107' };
      case 3: return { level: 'moderate', message: 'Moderate - Breathing discomfort to people with lung disease', color: '#FF9800' };
      case 4: return { level: 'poor', message: 'Poor - Breathing discomfort to most people', color: '#FF5722' };
      case 5: return { level: 'very-poor', message: 'Very Poor - Respiratory illness on prolonged exposure', color: '#D32F2F' };
      default: return { level: 'unknown', message: 'Unknown', color: '#9E9E9E' };
    }
  };

  const fetchAirQuality = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${selectedLocation.lat}&lon=${selectedLocation.lon}&appid=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch air quality data');
      }

      const data = await response.json();
      setAirQualityData(data);
      setError(null);
    } catch (err) {
      setError('Failed to load air quality data. Please try again later.');
      console.error('Error fetching air quality data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAirQuality();
    // Refresh data every 5 minutes
    const interval = setInterval(fetchAirQuality, 300000);
    return () => clearInterval(interval);
  }, [selectedLocation]);

  const getPollutantLevel = (value, pollutant) => {
    // Thresholds based on WHO guidelines
    const thresholds = {
      co: { moderate: 4, high: 10 }, // mg/m3
      no2: { moderate: 25, high: 50 }, // µg/m3
      o3: { moderate: 100, high: 180 }, // µg/m3
      so2: { moderate: 40, high: 100 }, // µg/m3
      pm2_5: { moderate: 10, high: 25 }, // µg/m3
      pm10: { moderate: 20, high: 50 } // µg/m3
    };

    const threshold = thresholds[pollutant];
    if (!threshold) return 'unknown';
    if (value < threshold.moderate) return 'good';
    if (value < threshold.high) return 'moderate';
    return 'high';
  };

  if (loading) {
    return <div className="loading">Loading air quality data...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  const { list: [current] } = airQualityData || { list: [{}] };
  const aqiInfo = getAQILevel(current.main?.aqi);

  return (
    <div className="air-quality-dashboard">
      <div className="dashboard-header">
        <button className="back-button" onClick={() => window.location.href = '/alert'}>
          <FaArrowLeft /> Back to Alerts
        </button>
        <h1>Mining Air Quality Monitor</h1>
      </div>

      <div className="aqi-main-card" style={{ borderColor: aqiInfo.color }}>
        <div className="aqi-header">
          <h2>Current Air Quality Index</h2>
          <span className="location">Dhanbad Mining Region</span>
        </div>
        <div className="aqi-value" style={{ color: aqiInfo.color }}>
          <FaMask />
          <span>{current.main?.aqi}</span>
        </div>
        <div className="aqi-description" style={{ backgroundColor: aqiInfo.color }}>
          {aqiInfo.message}
        </div>
      </div>

      <div className="pollutants-grid">
        <div className={`pollutant-card ${getPollutantLevel(current.components?.co, 'co')}`}>
          <h3>Carbon Monoxide (CO)</h3>
          <div className="pollutant-value">
            <FaExclamationTriangle />
            <span>{current.components?.co?.toFixed(2)} mg/m³</span>
          </div>
        </div>

        <div className={`pollutant-card ${getPollutantLevel(current.components?.no2, 'no2')}`}>
          <h3>Nitrogen Dioxide (NO₂)</h3>
          <div className="pollutant-value">
            <FaWind />
            <span>{current.components?.no2?.toFixed(2)} µg/m³</span>
          </div>
        </div>

        <div className={`pollutant-card ${getPollutantLevel(current.components?.pm10, 'pm10')}`}>
          <h3>PM10</h3>
          <div className="pollutant-value">
            <WiDust />
            <span>{current.components?.pm10?.toFixed(2)} µg/m³</span>
          </div>
        </div>

        <div className={`pollutant-card ${getPollutantLevel(current.components?.pm2_5, 'pm2_5')}`}>
          <h3>PM2.5</h3>
          <div className="pollutant-value">
            <WiDust />
            <span>{current.components?.pm2_5?.toFixed(2)} µg/m³</span>
          </div>
        </div>
      </div>

      <div className="safety-recommendations">
        <h2>Safety Recommendations</h2>
        {current.main?.aqi >= 4 && (
          <ul>
            <li>All miners should wear appropriate respiratory protection</li>
            <li>Limit prolonged outdoor work activities</li>
            <li>Increase ventilation in underground areas</li>
            <li>Monitor sensitive individuals closely</li>
          </ul>
        )}
        {current.main?.aqi === 3 && (
          <ul>
            <li>Sensitive individuals should wear masks</li>
            <li>Consider increasing ventilation</li>
            <li>Monitor air quality regularly</li>
          </ul>
        )}
        {current.main?.aqi <= 2 && (
          <ul>
            <li>Standard safety protocols apply</li>
            <li>Continue regular monitoring</li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default AirQualityAlert;
