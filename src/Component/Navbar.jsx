import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = ({ onSearch, isAuthenticated, setIsAuthenticated }) => {
   const [search, setSearch] = useState('');
   const [user, setUser] = useState(null);
   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
   const navigate = useNavigate();
   const dropdownRef = useRef(null);

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

   const handleSearch = (e) => {
      e.preventDefault();
      if (!search.trim()) return;
      onSearch(search.trim());
      navigate('/jobs');
   };

   const handleLogout = () => {
      localStorage.removeItem('user');
      setIsAuthenticated(false);
      navigate('/login');
   };

   const toggleDropdown = () => {
      setIsDropdownOpen(prev => !prev);
   };

   return (
      <nav className="navbar">
         <div className="navbar-container">

            <div className="logo">
               <Link to="/" className="logo-link">JobBoard</Link>
               <span className="tagline">We Build Future</span>
            </div>


            <ul className="nav-links">
               <li><Link to="/">Home</Link></li>
               <li><Link to="/jobs">Jobs</Link></li>
               <li><Link to="/employer">Employers</Link></li>
               <li><Link to="/candidate">Candidates</Link></li>
            </ul>


            <form className="search-box" onSubmit={handleSearch}>
               <input
                  type="text"
                  placeholder="Search jobs..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
               />
               <button type="submit">🔍</button>
            </form>


            <div className="auth-section" ref={dropdownRef}>
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
