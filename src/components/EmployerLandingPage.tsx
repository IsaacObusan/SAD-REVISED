import React, { useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';


const LandingPageEmployer = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="text-base text-gray-700">
            {/* Overview Content */}
            <h2 className="text-xl font-bold">Employer Dashboard</h2>
            <p className="mt-4">Here are your latest stats:</p>

            {/* Chart Section */}
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="p-4 bg-gray-100 rounded shadow">
                <h3 className="text-lg font-medium">Job Posting Insights</h3>
                <Bar
                  data={{
                    labels: ['Active Jobs', 'Applications', 'Positions Filled'],
                    datasets: [
                      {
                        label: 'Stats',
                        data: [5, 12, 3],
                        backgroundColor: ['#2DD4BF', '#60A5FA', '#A78BFA'],
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { display: false },
                    },
                  }}
                />
              </div>

              <div className="p-4 bg-gray-100 rounded shadow">
                <h3 className="text-lg font-medium">Application Distribution</h3>
                <Pie
                  data={{
                    labels: ['Software Engineer', 'Data Analyst', 'UX Designer'],
                    datasets: [
                      {
                        label: 'Applications',
                        data: [7, 3, 2],
                        backgroundColor: ['#34D399', '#60A5FA', '#FBBF24'],
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { position: 'bottom' },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        );
      case 'jobs':
        return (
          <div className="text-base text-gray-700">
            {/* Jobs Content */}
            <h2 className="text-xl font-bold">Manage Your Jobs</h2>
            <p className="mt-4">Here you can view and manage all your job postings:</p>
            <ul className="mt-4 space-y-2">
              <li>Job Title: Software Engineer (Active)</li>
              <li>Job Title: Data Analyst (Closed)</li>
              <li>Job Title: UX Designer (Draft)</li>
            </ul>
            <button className="mt-4 px-4 py-2 text-white bg-teal-500 rounded hover:bg-teal-600">
              Post a New Job
            </button>
          </div>
        );
      case 'candidates':
        return (
          <div className="text-base text-gray-700">
            {/* Candidates Content */}
            <h2 className="text-xl font-bold">Review Candidates</h2>
            <p className="mt-4">Manage and review your job applicants:</p>
            <ul className="mt-4 space-y-2">
              <li>
                <strong>John Doe</strong> - Applied for Software Engineer
                <button className="ml-4 px-3 py-1 text-sm text-white bg-teal-500 rounded hover:bg-teal-600">
                  View Profile
                </button>
              </li>
              <li>
                <strong>Jane Smith</strong> - Applied for Data Analyst
                <button className="ml-4 px-3 py-1 text-sm text-white bg-teal-500 rounded hover:bg-teal-600">
                  View Profile
                </button>
              </li>
              <li>
                <strong>Michael Brown</strong> - Applied for UX Designer
                <button className="ml-4 px-3 py-1 text-sm text-white bg-teal-500 rounded hover:bg-teal-600">
                  View Profile
                </button>
              </li>
            </ul>
          </div>
        );
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
