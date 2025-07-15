 import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = ({ setIsAuthenticated, setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    // Identify user role based on email
    const userType = email.includes('employer') ? 'Employer' : 'Candidate';

    // Fake user object
    const fakeUser = {
      email,
      userType,
    };

    localStorage.setItem('user', JSON.stringify(fakeUser));
    setIsAuthenticated(true);
    setUser(fakeUser);

    // ✅ Redirect to homepage — it will render based on role from App.jsx
    navigate('/');
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

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
          Don’t have an account? <a href="/signup">Signup here</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
