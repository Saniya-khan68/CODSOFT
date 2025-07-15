 import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './Component/Navbar';
import EmployerNavbar from './Component/EmployerNavbar';
import Hero from './Component/Hero';
import EmployerHome from './Component/EmployerHome';
import JobList from './Component/JobList';
import Footer from './Component/Footer';
import Login from './Component/Login';
import Signup from './Component/Signup';
import EmployerDashboard from './Component/EmployeDashboard';
import EmployerJobList from './Component/EmployerJobList';
import CandidateDashboard from './Component/CandidateDashboard';
import ApplyForm from './Component/ApplyForm';
import JobDetail from './Component/JobDetail';
import ProtectedRoute from './Component/ProtectedRoute';
import RoleBasedRoute from './Component/RoleBasedRoute';
import Profile from './Component/Profile';
import EditProfile from './Component/EditProfile';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const renderNavbar = () => {
    if (!isAuthenticated) {
      return <Navbar onSearch={setSearchTerm} />;
    }
    if (user?.userType === 'Employer') {
      return <EmployerNavbar setIsAuthenticated={setIsAuthenticated} />;
    }
    if (user?.userType === 'Candidate') {
      return (
        <Navbar
          onSearch={setSearchTerm}
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
      );
    }
    return null;
  };

  return (
    <>
      {renderNavbar()}

      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              user?.userType === 'Employer' ? (
                <EmployerHome user={user} />
              ) : (
                <Hero />
              )
            ) : (
              <Hero />
            )
          }
        />

        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} setUser={setUser} />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/jobs" element={<JobList searchTerm={searchTerm} />} />
        <Route path="/jobs/:id" element={<JobDetail />} />

        <Route
          path="/apply/:id"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <RoleBasedRoute user={user} allowedRoles={['Candidate']}>
                <ApplyForm />
              </RoleBasedRoute>
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
          path="/employer/jobs"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <RoleBasedRoute user={user} allowedRoles={['Employer']}>
                <EmployerJobList user={user} />
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
          path="/profile"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Profile />
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

        <Route path="*" element={<h2 style={{ padding: '40px' }}>404 - Page Not Found</h2>} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
