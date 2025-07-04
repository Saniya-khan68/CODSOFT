import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Component/Navbar';
import Hero from './Component/Hero';
import JobList from './Component/JobList';
import Footer from './Component/Footer';
import EmployeDashboard from './Component/EmployeDashboard';
import CandidateDashboard from './Component/CandidateDashboard';
import ProtectedRoute from './Component/ProtectedRoute';
import Signup from './Component/Signup';
import ApplyForm from './Component/ApplyForm';
import Login from './Component/Login';
import JobDetail from './Component/JobDetail';

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

  return (
    <>

      <Navbar
        onSearch={setSearchTerm}
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}

      />
      <Routes>
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Hero />
            </ProtectedRoute>
          }
        />

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
              <EmployeDashboard user={user} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/candidate"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <CandidateDashboard user={user} />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<h2 style={{ padding: '40px' }}> 404 page not fuond</h2>} />

        <Route
          path='/profile'
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
      </Routes>
      <Footer />



    </>
  );
};

export default App;
