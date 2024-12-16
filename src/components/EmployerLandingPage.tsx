import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import axios  from 'axios';

const LandingPageEmployer = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [jobs, setJobs] = useState<string[]>([]);
  const [application, setApplication] = useState<string[]>([]);
  const accountName = localStorage.getItem("accountName");
  const accountId = localStorage.getItem("id");
  const serverUrl = import.meta.env.VITE_APP_SERVERHOST;

  const handleLogout = () => {
    localStorage.removeItem('accountName'); 
    localStorage.removeItem('id'); 
    navigate('/login');
  };

  const getJobs = async() => {
    try {
      const response = await axios.post(serverUrl + "jobs", {id: accountId});
      const data = response.data.job_dets;  // Assuming the response is JSON
      if (Array.isArray(data)) {
        setJobs(data);
      } else {
        console.error("Expected an array, but got:", data);
      }
    } catch (e) {
      console.log(e);
    }
  }

  const getApplication = async() => {
    try {
      const response = await axios.post(serverUrl + "applications", {id: accountId});
      const data = response.data.application_dets;  // Assuming the response is JSON
      if (Array.isArray(data)) {
        setApplication(data);
      } else {
        console.error("Expected an array, but got:", data);
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getJobs();
    getApplication();
  }, []);

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
  
              {/* Modern Job Postings Table */}
              <div className="overflow-x-auto mt-6">
                <table className="min-w-full bg-white shadow-md rounded-md">
                  <thead className="bg-teal-500 text-white">
                    <tr>
                      <th className="py-3 px-6 text-left">Job Title</th>
                      <th className="py-3 px-6 text-left">Description</th>
                      <th className="py-3 px-6 text-left">Status</th>
                      <th className="py-3 px-6 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.map((job, index) => (
                      <tr key={job[0]} className="border-b hover:bg-teal-50">
                        <td className="py-3 px-6 flex items-center space-x-2">
                          <img 
                            src={job[4]} 
                            alt="Company Logo" 
                            className="w-8 h-8 rounded-full"
                          />
                          <span>{job[1]}</span>
                        </td>
                        <td className="py-3 px-6">{job[2]}</td>
                        <td className="py-3 px-6 text-teal-500">{job[3]}</td>
                        <td className="py-3 px-6 text-center">
                          <button className="px-4 py-2 text-sm text-white bg-teal-500 rounded hover:bg-teal-600">
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
  
              {/* Add New Job Button */}
              <div className="mt-6">
                <button className="px-6 py-3 text-white bg-teal-500 rounded-md hover:bg-teal-600">
                  Post a New Job
                </button>
              </div>
            </div>
          );
  
        case 'candidates':
          return (
            <div className="text-base text-gray-700">
              {/* Candidates Content */}
              <h2 className="text-xl font-bold">Review Candidates</h2>
              <p className="mt-4">Manage and review your job applicants:</p>
  
              {/* Modern Candidate Table */}
              <div className="overflow-x-auto mt-6">
                <table className="min-w-full bg-white shadow-md rounded-md">
                  <thead className="bg-teal-500 text-white">
                    <tr>
                      <th className="py-3 px-6 text-left">Name</th>
                      <th className="py-3 px-6 text-left">Age</th>
                      <th className="py-3 px-6 text-left">Disability</th>
                      <th className="py-3 px-6 text-left">Title</th>
                      <th className="py-3 px-6 text-left">Content</th>
                      <th className="py-3 px-6 text-left">Date</th>
                      <th className="py-3 px-6 text-left">Status</th>
                      <th className="py-3 px-6 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {application.map((app, index) => (
                      <tr key={app[7]} className="border-b">
                        <td className="py-3 px-6">{app[0]}</td>
                        <td className="py-3 px-6">{app[1]}</td>
                        <td className="py-3 px-6">{app[2]}</td>
                        <td className="py-3 px-6">{app[3]}</td>
                        <td className="py-3 px-6">{app[4]}</td>
                        <td className="py-3 px-6">{app[5]}</td>
                        <td className="py-3 px-6 text-teal-500">{app[6]}</td>
                        <td className="py-3 px-6 text-center">
                          <button className="px-4 py-2 text-sm text-white bg-teal-500 rounded hover:bg-teal-600">
                            View Profile
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );

        case 'logout':
          handleLogout();
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
          {['overview', 'jobs', 'candidates', 'logout'].map((tab) => (
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
