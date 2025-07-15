  import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './Component/Navbar';
import Hero from './Component/Hero';
import JobList from './Component/JobList';
import Footer from './Component/Footer';
import Login from './Component/Login';
import Signup from './Component/Signup';
import EmployerDashboard from './Component/EmployeDashboard';
import CandidateDashboard from './Component/CandidateDashboard';
import ApplyForm from './Component/Applyform';
import JobDetail from './Component/JobDetail';
import ProtectedRoute from './Component/ProtectedRoute';
import RoleBasedRoute from './Component/RoleBasedRoute';
import Profile from './Component/Profile';
import EditProfile from './Component/EditProfile';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Auto-login from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <>
      <Navbar
        onSearch={setSearchTerm}
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />

      <Routes>
        {/* ✅ Public Routes */}
        <Route path="/" element={<Hero />} />
        <Route 
          path="/login" 
          element={
            <Login 
              setIsAuthenticated={setIsAuthenticated} 
              setUser={setUser} 
            />
          } 
        />
        <Route path="/signup" element={<Signup />} />

        {/* ✅ Protected Routes */}
        <Route
          path="/jobs"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <JobList searchTerm={searchTerm} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs/:id"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <JobDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/apply/:id"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ApplyForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employer"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <RoleBasedRoute user={user} allowedRoles={['Employer']}>
                <EmployerDashboard user={user} />
              </RoleBasedRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/candidate"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <RoleBasedRoute user={user} allowedRoles={['Candidate']}>
                <CandidateDashboard user={user} />
              </RoleBasedRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <EditProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* ❌ 404 Page */}
        <Route path="*" element={<h2 style={{ padding: '40px' }}>404 - Page Not Found</h2>} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
