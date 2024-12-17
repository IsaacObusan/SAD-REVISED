import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logoo.png'; // Update path as needed
import Footer from './Footer';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState('job-offerings');
  const navigate = useNavigate();

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    // Uncomment below to navigate to specific routes when tab is clicked
    // navigate(`/admin/${tab}`);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'job-offerings':
        return (
          <div>
            <table className="min-w-full overflow-hidden bg-white rounded-lg shadow-md">
              <thead>
                <tr className="text-left bg-gray-200">
                  <th className="px-6 py-3 text-sm font-semibold text-gray-700">Job Title</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-700">Description</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-700">Location</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-700">Job Type</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-700">Posted Date</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="px-6 py-4 text-sm text-gray-800">Software Engineer</td>
                  <td className="px-6 py-4 text-sm text-gray-800">Develop and maintain software applications.</td>
                  <td className="px-6 py-4 text-sm text-gray-800">Remote</td>
                  <td className="px-6 py-4 text-sm text-gray-800">Full-time</td>
                  <td className="px-6 py-4 text-sm text-gray-800">01 Dec 2024</td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    <button className="px-4 py-2 text-white bg-teal-500 rounded-md">Edit</button>
                    <button className="px-4 py-2 ml-2 text-white bg-red-500 rounded-md">Delete</button>
                  </td>
                </tr>
                {/* Add more rows dynamically */}
              </tbody>
            </table>
          </div>
        );
      case 'application':
        return (
          <div>
            <table className="min-w-full overflow-hidden bg-white rounded-lg shadow-md">
              <thead>
                <tr className="text-left bg-gray-200">
                  <th className="px-6 py-3 text-sm font-semibold text-gray-700">Applicant Name</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-700">Email</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-700">Job Title</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-700">Applied Date</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="px-6 py-4 text-sm text-gray-800">John Doe</td>
                  <td className="px-6 py-4 text-sm text-gray-800">john.doe@email.com</td>
                  <td className="px-6 py-4 text-sm text-gray-800">Software Engineer</td>
                  <td className="px-6 py-4 text-sm text-gray-800">Pending</td>
                  <td className="px-6 py-4 text-sm text-gray-800">02 Dec 2024</td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    <button className="px-4 py-2 text-white bg-blue-500 rounded-md">View</button>
                    <button className="px-4 py-2 ml-2 text-white bg-green-500 rounded-md">Mark as Hired</button>
                    <button className="px-4 py-2 ml-2 text-white bg-red-500 rounded-md">Delete</button>
                  </td>
                </tr>
                {/* Add more rows dynamically */}
              </tbody>
            </table>
          </div>
        );
      case 'hiring-notice':
        return (
          <div>
            <p>Hiring Notice content goes here.</p>
          </div>
        );
      case 'portfolio':
        return (
          <div>
            <p>Portfolio content goes here.</p>
          </div>
        );

        case 'user management':
          return (
            <div>
              <p>section.</p>
            </div>
          );
      default:
        return <p>Select a tab to view its content.</p>;
        case 'hiring-notice':
          return (
            <div>
              <p>Hiring Notice content goes here.</p>
            </div>
          );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="py-4 bg-white shadow-lg">
        <div className="flex items-center justify-between px-8">
          <div className="flex items-center space-x-3">
            <img src={Logo} alt="Logo" className="h-12" />
            <span className="text-xl font-semibold">Admin Dashboard</span>
          </div>
          <nav className="flex space-x-8">
            {['job-offerings', 'application', 'hiring-notice', 'portfolio' , 'user management'].map((tab) => (
              <div
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={`cursor-pointer py-2 px-4 text-sm font-medium ${
                  activeTab === tab ? 'text-teal-500 border-b-2 border-teal-500' : 'text-gray-700'
                }`}
              >
                {tab.replace('-', ' ').toUpperCase()}
              </div>
            ))}
            <div className="px-4 py-2 text-sm font-medium text-gray-700 cursor-pointer">Logout</div>
          </nav>
        </div>
      </header>
      <main className="px-8 py-6">{renderTabContent()}</main>
      <Footer />
    </div>
  );
};

export default Admin;
