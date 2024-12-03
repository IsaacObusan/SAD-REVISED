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
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead>
                <tr className="text-left bg-gray-200">
                  <th className="py-3 px-6 text-sm font-semibold text-gray-700">Job Title</th>
                  <th className="py-3 px-6 text-sm font-semibold text-gray-700">Description</th>
                  <th className="py-3 px-6 text-sm font-semibold text-gray-700">Location</th>
                  <th className="py-3 px-6 text-sm font-semibold text-gray-700">Job Type</th>
                  <th className="py-3 px-6 text-sm font-semibold text-gray-700">Posted Date</th>
                  <th className="py-3 px-6 text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* Example Job Offerings Data */}
                <tr className="border-b">
                  <td className="py-4 px-6 text-sm text-gray-800">Software Engineer</td>
                  <td className="py-4 px-6 text-sm text-gray-800">Develop and maintain software applications.</td>
                  <td className="py-4 px-6 text-sm text-gray-800">Remote</td>
                  <td className="py-4 px-6 text-sm text-gray-800">Full-time</td>
                  <td className="py-4 px-6 text-sm text-gray-800">01 Dec 2024</td>
                  <td className="py-4 px-6 text-sm text-gray-800">
                    <button className="bg-teal-500 text-white px-4 py-2 rounded-md">Edit</button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-md ml-2">Delete</button>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-6 text-sm text-gray-800">Marketing Manager</td>
                  <td className="py-4 px-6 text-sm text-gray-800">Lead marketing campaigns and strategies.</td>
                  <td className="py-4 px-6 text-sm text-gray-800">Cebu City</td>
                  <td className="py-4 px-6 text-sm text-gray-800">Full-time</td>
                  <td className="py-4 px-6 text-sm text-gray-800">20 Nov 2024</td>
                  <td className="py-4 px-6 text-sm text-gray-800">
                    <button className="bg-teal-500 text-white px-4 py-2 rounded-md">Edit</button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-md ml-2">Delete</button>
                  </td>
                </tr>
                {/* More rows can be added dynamically */}
              </tbody>
            </table>
          </div>
        )}
   {activeTab === 'application' && (
          <div>
            {/* Application Content */}
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead>
                <tr className="text-left bg-gray-200">
                  <th className="py-3 px-6 text-sm font-semibold text-gray-700">Applicant Name</th>
                  <th className="py-3 px-6 text-sm font-semibold text-gray-700">Email</th>
                  <th className="py-3 px-6 text-sm font-semibold text-gray-700">Job Title</th>
                  <th className="py-3 px-6 text-sm font-semibold text-gray-700">Status</th>
                  <th className="py-3 px-6 text-sm font-semibold text-gray-700">Applied Date</th>
                  <th className="py-3 px-6 text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* Example Application Data */}
                <tr className="border-b">
                  <td className="py-4 px-6 text-sm text-gray-800">John Doe</td>
                  <td className="py-4 px-6 text-sm text-gray-800">john.doe@email.com</td>
                  <td className="py-4 px-6 text-sm text-gray-800">Software Engineer</td>
                  <td className="py-4 px-6 text-sm text-gray-800">Pending</td>
                  <td className="py-4 px-6 text-sm text-gray-800">02 Dec 2024</td>
                  <td className="py-4 px-6 text-sm text-gray-800">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md">View</button>
                    <button className="bg-green-500 text-white px-4 py-2 rounded-md ml-2">Mark as Hired</button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-md ml-2">Delete</button>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-6 text-sm text-gray-800">Jane Smith</td>
                  <td className="py-4 px-6 text-sm text-gray-800">jane.smith@email.com</td>
                  <td className="py-4 px-6 text-sm text-gray-800">Marketing Manager</td>
                  <td className="py-4 px-6 text-sm text-gray-800">Interviewed</td>
                  <td className="py-4 px-6 text-sm text-gray-800">25 Nov 2024</td>
                  <td className="py-4 px-6 text-sm text-gray-800">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md">View</button>
                    <button className="bg-green-500 text-white px-4 py-2 rounded-md ml-2">Mark as Hired</button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-md ml-2">Delete</button>
                  </td>
                </tr>
                {/* More rows can be added dynamically */}
              </tbody>
            </table>
          </div>
        )}
           {activeTab === 'hiring-notice' && (
          <div>
            {/* Hiring Notice Content */}
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead>
                <tr className="text-left bg-gray-200">
                  <th className="py-3 px-6 text-sm font-semibold text-gray-700">Notice Title</th>
                  <th className="py-3 px-6 text-sm font-semibold text-gray-700">Job Title</th>
                  <th className="py-3 px-6 text-sm font-semibold text-gray-700">Description</th>
                  <th className="py-3 px-6 text-sm font-semibold text-gray-700">Post Date</th>
                  <th className="py-3 px-6 text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* Example Hiring Notice Data */}
                <tr className="border-b">
                  <td className="py-4 px-6 text-sm text-gray-800">Hiring for Software Engineers</td>
                  <td className="py-4 px-6 text-sm text-gray-800">Software Engineer</td>
                  <td className="py-4 px-6 text-sm text-gray-800">Looking for talented software engineers for a tech startup.</td>
                  <td className="py-4 px-6 text-sm text-gray-800">25 Nov 2024</td>
                  <td className="py-4 px-6 text-sm text-gray-800">
                    <button className="bg-teal-500 text-white px-4 py-2 rounded-md">Edit</button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-md ml-2">Delete</button>
                  </td>
                </tr>
                {/* More rows can be added dynamically */}
              </tbody>
            </table>
          </div>
        )}
   {activeTab === 'portfolio' && (
          <div>
            {/* Portfolio Content */}
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead>
                <tr className="text-left bg-gray-200">
                  <th className="py-3 px-6 text-sm font-semibold text-gray-700">Image/Thumbnail</th>
                  <th className="py-3 px-6 text-sm font-semibold text-gray-700">Portfolio Title</th>
                  <th className="py-3 px-6 text-sm font-semibold text-gray-700">Description</th>
                  <th className="py-3 px-6 text-sm font-semibold text-gray-700">Date Added</th>
                  <th className="py-3 px-6 text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* Example Portfolio Data */}
                <tr className="border-b">
                  <td className="py-4 px-6 text-sm text-gray-800">
                    <img src="https://via.placeholder.com/150" alt="Portfolio Thumbnail" className="w-20 h-20 object-cover rounded-md" />
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-800">Tech Startup Portfolio</td>
                  <td className="py-4 px-6 text-sm text-gray-800">Showcasing a collection of software engineering projects.</td>
                  <td className="py-4 px-6 text-sm text-gray-800">01 Dec 2024</td>
                  <td className="py-4 px-6 text-sm text-gray-800">
                    <button className="bg-teal-500 text-white px-4 py-2 rounded-md">Edit</button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-md ml-2">Delete</button>
                  </td>
                </tr>
                {/* More rows can be added dynamically */}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;