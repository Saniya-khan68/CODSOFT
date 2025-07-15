import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
 import '../Styles/Navbar.css';

import { clearLocalData } from '../utils/storage';

const Navbar = ({ onSearch, isAuthenticated, setIsAuthenticated }) => {
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) setUser(storedUser);
  }, [isAuthenticated]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    clearLocalData();
    setIsAuthenticated(false);
    setUser(null);
    navigate('/login');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Left: Logo */}
        <div className="logo">
          <Link to="/" className="logo-link">JobBoard</Link>
          <span className="tagline">We Build Future</span>
        </div>

        {/* Center: Nav links and search */}
        {isAuthenticated && (
          <div className="navbar-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/jobs" className="nav-link">Jobs</Link>
            <input
              type="text"
              className="search-input"
              placeholder="Search jobs..."
              onChange={(e) => onSearch && onSearch(e.target.value)}
            />
          </div>
        )}

        {/* Right: Notification + Auth/Profile */}
        <div className="right-section" ref={dropdownRef}>
          {isAuthenticated && (
            <Link to="/notifications" className="nav-link">🔔</Link>
          )}
          {isAuthenticated && user ? (
            <div className="profile-dropdown">
              <div className="profile-trigger" onClick={toggleDropdown}>
                <div className="profile-avatar">
                  {user?.email?.charAt(0).toUpperCase()}
                </div>
                <div className="profile-name">
                  {user?.email?.split('@')[0]}
                </div>
              </div>

              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <Link to="/profile" onClick={() => setIsDropdownOpen(false)}>View Profile</Link>
                  <Link to="/edit-profile" onClick={() => setIsDropdownOpen(false)}>Edit Profile</Link>
                  <Link
                    to={user?.userType === 'Employer' ? '/employer' : '/candidate'}
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link to="/settings" onClick={() => setIsDropdownOpen(false)}>Settings</Link>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <div className="nav-auth-links">
              <Link to="/login" className="login-link">Login</Link>
              <Link to="/signup" className="signup-link">Signup</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
