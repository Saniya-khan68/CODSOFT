import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Login.css';

const Login = ({ setIsAuthenticated, setUser }) => {
  const [role, setRole] = useState('Candidate'); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

     
    const fakeUser = {
      email,
      userType: role,
    };

    localStorage.setItem('user', JSON.stringify(fakeUser));
    setIsAuthenticated(true);
    setUser(fakeUser);

    navigate('/');
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <label>Login As</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="Candidate">Candidate</option>
          <option value="Employer">Employer</option>
        </select>

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@email.com"
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your password"
          required
        />

        <button type="submit">Login</button>

        <p>
          Don’t have an account? <a href="/signup">Signup </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
