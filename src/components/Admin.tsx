import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logoo.png'; // Import the logo

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState('job-offerings'); // State for active tab
  const navigate = useNavigate();

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    // Here, you could navigate to specific pages if needed
    // For example:
    // if (tab === 'application') {
    //   navigate('/admin/application');
    // }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-lg py-4">
        <div className="flex items-center justify-between px-8">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img src={Logo} alt="Logo" className="h-12" />
            <span className="text-xl font-semibold">Admin Dashboard</span>
          </div>

          {/* Tabs */}
          <nav className="flex space-x-8">
            <div
              onClick={() => handleTabClick('job-offerings')}
              className={`cursor-pointer py-2 px-4 text-sm font-medium ${
                activeTab === 'job-offerings' ? 'text-teal-500 border-b-2 border-teal-500' : 'text-gray-700'
              }`}
            >
              Job Offerings
            </div>
            <div
              onClick={() => handleTabClick('application')}
              className={`cursor-pointer py-2 px-4 text-sm font-medium ${
                activeTab === 'application' ? 'text-teal-500 border-b-2 border-teal-500' : 'text-gray-700'
              }`}
            >
              Application
            </div>
            <div
              onClick={() => handleTabClick('hiring-notice')}
              className={`cursor-pointer py-2 px-4 text-sm font-medium ${
                activeTab === 'hiring-notice' ? 'text-teal-500 border-b-2 border-teal-500' : 'text-gray-700'
              }`}
            >
              Hiring Notice
            </div>
            <div
              onClick={() => handleTabClick('portfolio')}
              className={`cursor-pointer py-2 px-4 text-sm font-medium ${
                activeTab === 'portfolio' ? 'text-teal-500 border-b-2 border-teal-500' : 'text-gray-700'
              }`}
            >
              Portfolio
            </div>
            <div className={`cursor-pointer py-2 px-4 text-sm font-medium`}>Logout</div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="px-8 py-6">
        <h2 className="text-2xl font-semibold">{activeTab.replace('-', ' ').toUpperCase()}</h2>
        {/* Content based on active tab */}
        {activeTab === 'job-offerings' && (
          <div>
            {/* Job Offerings Content */}
            <p>This is the Job Offerings section</p>
          </div>
        )}
        {activeTab === 'application' && (
          <div>
            {/* Application Content */}
            <p>This is the Application section</p>
          </div>
        )}
        {activeTab === 'hiring-notice' && (
          <div>
            {/* Hiring Notice Content */}
            <p>This is the Hiring Notice section</p>
          </div>
        )}
        {activeTab === 'portfolio' && (
          <div>
            {/* Portfolio Content */}
            <p>This is the Portfolio section</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
