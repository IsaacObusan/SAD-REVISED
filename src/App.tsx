import React, { Suspense, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer'; // Import the Footer component
import AccessibilityTool from './components/AccessibilityTool'; // Import the AccessibilityToolbar component


// Lazy-loaded components for optimization
const MainLandingPage = React.lazy(() => import('./components/MainLandingPage'));
const Login = React.lazy(() => import('./components/Login'));
const EmployeeLandingPage = React.lazy(() => import('./components/EmployeeLandingPage'));
const EmployerLandingPage = React.lazy(() => import('./components/EmployerLandingPage'));
const ErrorPage = React.lazy(() => import('./components/Error'));
const SignUp = React.lazy(() => import('./components/SignUp'));
const Admin = React.lazy(() => import('./components/Admin'));
const YourProfile = React.lazy(() => import('./components/YourProfile')); // Lazy load YourProfile component
const MyStats = React.lazy(() => import('./components/MyStats'));
const Settings = React.lazy(() => import('./components/Settings')); // Lazy load Settings component
const Forgot = React.lazy(() => import('./components/Forgot')); // Lazy load Forgot component
const Explore = React.lazy(() => import('./components/Explore')); 
const Materials = React.lazy(() => import('./components/Materials'));
const VoiceCommand = React.lazy(() => import('./components/VoiceCommand'));

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
          <Route path="/" element={<MainLandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/employee-landing" element={<EmployeeLandingPage />} />
          <Route path="/employer-landing" element={<EmployerLandingPage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/profile" element={<YourProfile />} /> {/* Add route for YourProfile */}
          <Route path="/stats" element={<MyStats />} /> {/* Add route for MyStats */}
          <Route path="/settings" element={<Settings />} /> {/* Add route for Settings */}
          <Route path="/forgot" element={<Forgot />} /> {/* Add route for Forgot Password */}
          <Route path="/explore" element={<Explore />} />
          <Route path="/materials" element={<Materials/>} />
          <Route path="voice-command" element={<VoiceCommand/>} />

          <Route path="/*" element={<ErrorPage />} />
        </Routes>
        <Footer /> {/* Insert Footer component */}
        <AccessibilityTool /> {/* Insert AccessibilityToolbar component */}
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
