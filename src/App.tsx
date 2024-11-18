import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import EmployeeLandingPage from './components/EmployeeLandingPage'; // Employee landing page component
import EmployerLandingPage from './components/EmployerLandingPage'; // Employer landing page component
import SignUp from './components/SignUp'; // Your SignUp component with tab container

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {/* Root path shows the Login page */}
        <Route path="/login" element={<Login />} /> {/* Login page */}
        <Route path="/sign-up" element={<SignUp />} /> {/* Sign-Up page with tab container */}
        <Route path="/employee-landing" element={<EmployeeLandingPage />} /> {/* Employee landing page */}
        <Route path="/employer-landing" element={<EmployerLandingPage />} /> {/* Employer landing page */}
      </Routes>
    </Router>
  );
};

export default App;
