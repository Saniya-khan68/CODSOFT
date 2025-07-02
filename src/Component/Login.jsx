import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '..styles/login.css'


const Login = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('candidate');
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('user', JSON.stringify({ email, userType }));

        setIsAuthenticated(true);

        if (userType === 'Employer') {
            navigate('/employer');
        } else {
            navigate('/candidate')
        }
    };
    return (
        <div className='login-container'>
            <form className='login-form' onSubmit={handleSubmit}>
                <h2>Login</h2>

                <label> Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required />

                <label>Password</label>
                <input
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />


                <label>User Type</label>
                <select
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}>
                    <option value="Candidate">Candidate</option>
                    <option value="Employer">Employer</option>

                </select>

                <button type='submit'>Login</button>
                <p className='signup-text'>
                    Don't have an account?
                    <a href="/signup"> Signup</a>
                </p>
            </form>

        </div>
    );
};

export default Login;
