import React, { useState } from 'react';

const LandingPageEmployer = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <div className="text-base text-gray-700">Overview Content</div>;
      case 'jobs':
        return <div className="text-base text-gray-700">Jobs Content</div>;
      case 'candidates':
        return <div className="text-base text-gray-700">Candidates Content</div>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="flex flex-col items-center justify-between gap-4 p-4 bg-white rounded-md shadow sm:flex-row">
        {/* Logo */}
        <img 
          src="/Logoo.png" 
          alt="Logo" 
          className="w-auto h-20 sm:h-24" 
        />

        {/* Navigation Tabs */}
        <nav className="flex flex-wrap justify-center gap-4 sm:flex-nowrap sm:gap-8">
          {['overview', 'jobs', 'candidates'].map((tab) => (
            <button
              key={tab}
              className={`relative py-2 px-4 text-sm font-medium text-gray-900 transition-colors ${
                activeTab === tab 
                  ? 'border-b-2 border-teal-500'
                  : 'hover:text-teal-500 group'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} {/* Capitalizes tab names */}
              <span
                className={`absolute left-0 bottom-0 w-full h-[2px] bg-teal-500 transition-transform duration-300 ${
                  activeTab === tab ? 'scale-100' : 'scale-0 group-hover:scale-100'
                }`}
              ></span>
            </button>
          ))}
        </nav>
      </header>

      {/* Main Content */}
      <main className="p-4 mt-5 bg-white rounded-md shadow md:p-6">
        {renderContent()}
      </main>
    </div>
  );
};

export default LandingPageEmployer;
