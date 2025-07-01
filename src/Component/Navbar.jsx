import React from 'react'
import '../Styles/Navbar.css';

const Navbar = () => {
  return (
     <nav className='navbar'>
        <div className='navbar-container'>
             
                <div className='logo'>
                    <p>JOB~BOARD</p>
                    <span>We build future</span>

                </div>
             <ul className='nav-links'>
                 <li>Home</li>
                 <li>Jobs</li>
                 <li>Employers</li>
                 <li>Candidates</li>
                 <li>Profile</li>
                 <li>Login</li>
                 <li>Sign-up</li>
             </ul>

             <form className='search-box'
             >
                <input type="text"
                placeholder='Search jobs...'
                
                 />
                 <button type='submit'>🔍</button>
             </form>
        </div>

     </nav>
  );
};

export default Navbar;
