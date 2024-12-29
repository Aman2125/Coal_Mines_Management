import React from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form">
        <div className="form-group">
          <label>Email:</label>
          <input type="email" required />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" required />
        </div>
        <button type="submit" className="btn">Login</button>
      </form>
      <p className="signup-text">
        Don't have an account? <Link to="/new-registration">New Registration</Link>
      </p>
    </div>
  );
};

export default LoginPage;
