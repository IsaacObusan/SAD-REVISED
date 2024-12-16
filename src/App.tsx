import React, { Suspense, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer'; // Import the Footer component
import AccessibilityTool from './components/AccessibilityTool'; // Import the AccessibilityToolbar component
import PostModal from './components/PostModal'; // Import the PostModal component

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
  const [showModal, setShowModal] = useState(false); // State to manage the modal visibility

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
          <Route path="/apply-applicant" element={<ApplicantApply />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>

        {/* PostModal Component */}
        <PostModal
          showModal={showModal}
          setShowModal={setShowModal} onClose={function (): void {
            throw new Error('Function not implemented.');
          } }        />

        {/* Footer and Accessibility Toolbar */}
        <Footer />
        <AccessibilityTool />

        {/* Example button to trigger the modal */}
        <button
          onClick={() => setShowModal(true)}
          className="fixed bottom-4 right-4 p-4 bg-teal-500 text-white rounded-full shadow-lg"
        >
          Post Job
        </button>
      </Suspense>
    </BrowserRouter>
  );
};


export default App;
