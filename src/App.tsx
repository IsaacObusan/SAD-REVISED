import React, { Suspense } from 'react';
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
const YourProfile = React.lazy(() => import('./components/YourProfile'));
const MyStats = React.lazy(() => import('./components/MyStats'));
const Settings = React.lazy(() => import('./components/Settings'));
const Forgot = React.lazy(() => import('./components/Forgot'));
const Explore = React.lazy(() => import('./components/Explore'));
const Materials = React.lazy(() => import('./components/Materials'));
const VoiceCommand = React.lazy(() => import('./components/VoiceCommand'));
const HighContrast = React.lazy(() => import('./components/HighContrast')); // Lazy load HighContrast component
const ApplicantApply = React.lazy(() => import('./components/ApplicantApply'));

// Loading spinner for fallback
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="w-16 h-16 border-4 border-t-4 border-teal-500 rounded-full animate-spin"></div>
  </div>
);

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        {/* Application Routes */}
        <Routes>
          <Route path="/" element={<MainLandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/employee-landing" element={<EmployeeLandingPage />} />
          <Route path="/employer-landing" element={<EmployerLandingPage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/profile" element={<YourProfile />} />
          <Route path="/stats" element={<MyStats />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/materials" element={<Materials />} />
          <Route path="/voice-command" element={<VoiceCommand />} />
          <Route path="/high-contrast" element={<HighContrast />} /> 
          {/* Add route for HighContrast */}
          <Route path="/apply-applicant" element={<ApplicantApply />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>

        {/* Footer and Accessibility Toolbar */}
        <Footer />
        <AccessibilityTool />
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
