 
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/EmployerNavbar.css';  

const EmployerNavbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <nav className="employer-navbar">
      <div className="employer-navbar-container">
        <div className="employer-logo">
          <Link to="/employer" className="employer-logo-link">
            JobBoard <span>Employer</span>
          </Link>
        </div>
        <div className="employer-links">
          <Link to="/employer" className="nav-link">Dashboard</Link>
          <Link to="/employer/jobs" className="nav-link">Jobs</Link>
          <Link to="/profile" className="nav-link">Profile</Link>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default EmployerNavbar;
