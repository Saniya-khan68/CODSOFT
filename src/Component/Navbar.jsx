import React, { useState } from 'react'
import '../Styles/Navbar.css';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onSearch, isAuthenticated, setIsAuthenticated }) => {
   const [search, setSearch] = useState('');
   const navigate = useNavigate();

   const handleSearch = (e) => {
      e.preventDefault();
      if (!search.trim())
         return;
      onSearch(search.trim());
      navigate('/jobs');
   };

   const handleLogout = () => {
      localStorage.removeItem('user');
      setIsAuthenticated(false);
      navigate('/login');
   }


   return (
      <nav className='navbar'>
         <div className='navbar-blur-bg'></div>
         <div className='navbar-container'>

            <div className='logo'>
               <Link to="/" className="logo-link">JOB~BOARD</Link>
               <span className='tagline'>We build future</span>

            </div>
            <ul className='nav-links'>
               <li><Link to="/">Home</Link> </li>
               <li><Link to="jobs">Jobs</Link> </li>
               <li><Link to="employer">Employers</Link> </li>
               <li><Link to="candidate"></Link>Candidates</li>


               {isAuthenticated ? (
                  <>
                     <li><Link to="/profile">Profile</Link> </li>
                     <li><button className='logout-btn' onClick={handleLogout}>Logout</button></li>
                  </>
               ) : (
                  <>
                     <li><Link to="/login">Login</Link> </li>
                     <li><Link to="/signup">Sign-up</Link> </li>
                  </>
               )}

            </ul>

            <form className='search-box' onSubmit={handleSearch}>

               <input type="text"
                  placeholder='Search jobs...'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}

               />
               <button type='submit'>🔍</button>
            </form>
         </div>

      </nav>
   );
};

export default Navbar;
