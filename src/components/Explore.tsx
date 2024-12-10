import React, { useState } from 'react';

const ExplorePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'About' | 'Jobs'>('About');
  const [jobs, setJobs] = useState<string[]>([]); // Placeholder for job listings

  const handleTabChange = (tab: 'About' | 'Jobs') => {
    setActiveTab(tab);
  };

  return (
    <div className="p-8 bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 text-center">Explore Company</h1>

      <div className="mt-6 text-center text-lg text-gray-600">
        <p>
          Discover opportunities and more about companies that are inclusive and offer great job opportunities for the PWD community.
        </p>
      </div>

      <div className="w-full max-w-lg mx-auto mt-6 bg-white rounded-lg shadow-lg">
        <div className="w-full h-48 bg-gray-300">
          <img
            src="/cover-photo.png" // Replace with actual image path
            alt="Cover"
            className="object-cover w-full h-full"
          />
        </div>

        <div className="relative flex flex-col items-center w-full p-4 -mt-12 bg-white rounded-t-lg shadow-lg">
          <div className="w-24 h-24 bg-gray-300 border-4 border-white rounded-full">
            <img
              src="/profile-placeholder.png" // Replace with actual profile image path
              alt="Profile"
              className="object-cover w-full h-full rounded-full"
            />
          </div>

          <h1 className="mt-4 text-2xl font-bold text-gray-800">Company Name</h1>
        </div>
      </div>

      <div className="w-full mt-6 max-w-lg mx-auto bg-white rounded-lg shadow-lg">
        <div className="flex justify-center border-b">
          <button
            onClick={() => handleTabChange('About')}
            className={`px-6 py-2 text-sm font-medium ${activeTab === 'About' ? 'text-teal-500 border-teal-500 border-b-2' : 'text-gray-600'}`}
          >
            About Company
          </button>
          <button
            onClick={() => handleTabChange('Jobs')}
            className={`px-6 py-2 text-sm font-medium ${activeTab === 'Jobs' ? 'text-teal-500 border-teal-500 border-b-2' : 'text-gray-600'}`}
          >
            Jobs
          </button>
        </div>

        <div className="p-4 mt-4">
          {activeTab === 'About' && <p className="text-sm text-gray-600">About the company...</p>}
          {activeTab === 'Jobs' && (jobs.length > 0 ? jobs.map((job, idx) => <p key={idx}>{job}</p>) : <p>No jobs available</p>)}
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
