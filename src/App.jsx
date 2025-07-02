import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Component/Navbar';
import Hero from './Component/Hero';
import Footer from './Component/Footer';
import EmployeDashboard from './Component/EmployeDashboard';
import CandidateDashboard from './Component/CandidateDashboard';
import ProtectedRoute from './Component/ProtectedRoute';



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

        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Hero />
            </ProtectedRoute>
          }
        />

      </Routes>
      <Hero />

      <EmployeDashboard />
      <CandidateDashboard />
      <Footer />



    </>
  );
};

export default App;
