import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Lazy-loaded components for optimization
const MainLandingPage = React.lazy(() => import('./components/MainLandingPage'));
const Login = React.lazy(() => import('./components/Login'));
const EmployeeLandingPage = React.lazy(() => import('./components/EmployeeLandingPage'));
const EmployerLandingPage = React.lazy(() => import('./components/EmployerLandingPage'));
const ErrorPage = React.lazy(() => import('./components/Error'));
const SignUp = React.lazy(() => import('./components/SignUp')); // Sign-Up page
const Admin = React.lazy(() => import('./components/Admin'));

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="w-16 h-16 border-4 border-t-4 border-teal-500 rounded-full animate-spin"></div>
  </div>
);

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<MainLandingPage />} /> {/* Root path shows MainLandingPage */}
          <Route path="/login" element={<Login />} /> {/* Login page */}
          <Route path="/sign-up" element={<SignUp />} /> {/* Sign-Up page */}
          <Route path="/employee-landing" element={<EmployeeLandingPage />} /> {/* Employee landing page */}
          <Route path="/employer-landing" element={<EmployerLandingPage />} /> {/* Employer landing page */}
          <Route path="/admin" element={<Admin />} /> {/* Admin page */}
          <Route path="/*" element={<ErrorPage />} /> {/* Handle invalid routes */}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
