import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logoo.png'; // Update path as needed
import Footer from './Footer';
import axios from 'axios';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState('job-offerings');
  const [jobOfferings, setJobOfferings] = useState<string[]>([]);
  const [application, setApplication] = useState<string[]>([]);
  const [hiring, setHiring] = useState<string[]>([]);
  const [portfolio, setPortfolio] = useState<string[]>([]);
  const [user, setUser] = useState<string[]>([]);
  const [type, setType] = useState('applicant');

  const navigate = useNavigate();
  const serverUrl = import.meta.env.VITE_APP_SERVERHOST;

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    // Uncomment below to navigate to specific routes when tab is clicked
    // navigate(`/admin/${tab}`);
  };

  const fetchDetails = async() =>{
    try {
      const response = await axios.get(serverUrl + "jobs");
      setJobOfferings(response.data.job_details);
    } catch (error) {
      console.log(error);
    }
  }

  const fetchApplications = async() =>{
    try {
      const response = await axios.get(serverUrl + "applications");
      setApplication(response.data.application_details);
    } catch (error) {
      console.log(error);
    }
  }

  const fetchNotice = async() =>{
    try {
      const response = await axios.get(serverUrl + "get_notice");
      setHiring(response.data.notice_details);
    } catch (error) {
      console.log(error);
    }
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString); // Convert string to Date
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const onSelect = async(data:string) =>{
    try {
      const response = await axios.post(serverUrl + "get_user", {type: data})
      setType(data);
      setUser(response.data.users);
    } catch (error) {
      console.error()
    }
  }

  useEffect(() => {
    fetchDetails();
    fetchApplications();
    fetchNotice();
    onSelect(type);
  }, []);

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
                  <th className="px-6 py-3 text-sm font-semibold text-gray-700">Rate</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-700">Posted Date</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobOfferings.map((jobs, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-6 py-4 text-sm text-gray-800">{jobs[1]}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{jobs[2]}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{jobs[3]}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{jobs[4]}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{jobs[5]}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{formatDate(jobs[6])}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      <button className="px-4 py-2 text-white bg-teal-500 rounded-md">Edit</button>
                      <button className="px-4 py-2 text-white bg-red-500 rounded-md">Delete</button>
                    </td>
                  </tr>
                ))}
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
                <th className="px-6 py-3 text-sm font-semibold text-gray-700">Title</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-700">Description</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-700">Applicant</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-700">Job</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-700">Posted Date</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {application.map((app, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-6 py-4 text-sm text-gray-800">{app[1]}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{app[2]}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{app[5]}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{app[4]}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{app[6]}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{formatDate(app[3])}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      <button className="px-4 py-2 text-white bg-blue-500 rounded-md">View</button>
                      <button className="px-4 py-2 text-white bg-red-500 rounded-md">Delete</button>
                    </td>
                  </tr>
                ))}
                {/* Add more rows dynamically */}
              </tbody>
            </table>
          </div>
        );
      case 'hiring notice':
        return (
          <div>
            <table className="min-w-full overflow-hidden bg-white rounded-lg shadow-md">
              <thead>
                <tr className="text-left bg-gray-200">
                <th className="px-6 py-3 text-sm font-semibold text-gray-700">Title</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-700">Description</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-700">Applicant</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-700">Date</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-700">Employer</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {hiring.map((hire, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-6 py-4 text-sm text-gray-800">{hire[1]}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{hire[2]}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{hire[3]}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{formatDate(hire[4])}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{hire[5]}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      <button className="px-4 py-2 text-white bg-teal-500 rounded-md">Edit</button>
                      <button className="px-4 py-2 text-white bg-red-500 rounded-md">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'portfolio':
        return (
          <div>
            <table className="min-w-full overflow-hidden bg-white rounded-lg shadow-md">
              <thead>
                <tr className="text-left bg-gray-200">
                  <th className="px-6 py-3 text-sm font-semibold text-gray-700">Job Title</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-700">Description</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-700">Applicant</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-700">Job</th>
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

        case 'user management':
          return (
            <div>
              <select 
                className='px-4 py-1 rounded-md'
                onChange={(e) => onSelect(e.target.value)}
              >
                <option value="applicant">Applicant</option>
                <option value="employer">Employer</option>
              </select>
              {type === "applicant" ? (
                <table className="min-w-full overflow-hidden bg-white rounded-lg shadow-md">
                  <thead>
                    <tr className="text-left bg-gray-200">
                      <th className="px-6 py-3 text-sm font-semibold text-gray-700">Name</th>
                      <th className="px-6 py-3 text-sm font-semibold text-gray-700">Age</th>
                      <th className="px-6 py-3 text-sm font-semibold text-gray-700">Address</th>
                      <th className="px-6 py-3 text-sm font-semibold text-gray-700">Disability</th>
                      <th className="px-6 py-3 text-sm font-semibold text-gray-700">Date Created</th>
                      <th className="px-6 py-3 text-sm font-semibold text-gray-700">Status</th>
                      <th className="px-6 py-3 text-sm font-semibold text-gray-700">Email</th>
                      <th className="px-6 py-3 text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user.map((user, index) => (
                      <tr key={index} className="border-b">
                        <td className="px-6 py-4 text-sm text-gray-800">{user[1]}</td>
                        <td className="px-6 py-4 text-sm text-gray-800">{user[2]}</td>
                        <td className="px-6 py-4 text-sm text-gray-800">{user[3]}</td>
                        <td className="px-6 py-4 text-sm text-gray-800">{JSON.parse(user[4]).map((impairment, index) =>(
                           <li key={index}>{impairment}</li>
                        ))}</td>
                        <td className="px-6 py-4 text-sm text-gray-800">{formatDate(user[5])}</td>
                        <td className="px-6 py-4 text-sm text-gray-800">{user[6]}</td>
                        <td className="px-6 py-4 text-sm text-gray-800">{user[7]}</td>
                        <td className="px-6 py-4 text-sm text-gray-800">
                          <button className="px-4 py-2 text-white bg-teal-500 rounded-md">Edit</button>
                          <button className="px-4 py-2 text-white bg-red-500 rounded-md">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <table className="min-w-full overflow-hidden bg-white rounded-lg shadow-md">
                  <thead>
                    <tr className="text-left bg-gray-200">
                      <th className="px-6 py-3 text-sm font-semibold text-gray-700">Name</th>
                      <th className="px-6 py-3 text-sm font-semibold text-gray-700">Age</th>
                      <th className="px-6 py-3 text-sm font-semibold text-gray-700">Address</th>
                      <th className="px-6 py-3 text-sm font-semibold text-gray-700">Date Created</th>
                      <th className="px-6 py-3 text-sm font-semibold text-gray-700">Status</th>
                      <th className="px-6 py-3 text-sm font-semibold text-gray-700">Email</th>
                      <th className="px-6 py-3 text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user.map((user, index) => (
                      <tr key={index} className="border-b">
                        <td className="px-6 py-4 text-sm text-gray-800">{user[1]}</td>
                        <td className="px-6 py-4 text-sm text-gray-800">{user[2]}</td>
                        <td className="px-6 py-4 text-sm text-gray-800">{user[3]}</td>
                        <td className="px-6 py-4 text-sm text-gray-800">{formatDate(user[4])}</td>
                        <td className="px-6 py-4 text-sm text-gray-800">{user[5]}</td>
                        <td className="px-6 py-4 text-sm text-gray-800">{user[6]}</td>
                        <td className="px-6 py-4 text-sm text-gray-800">
                          <button className="px-4 py-2 text-white bg-teal-500 rounded-md">Edit</button>
                          <button className="px-4 py-2 text-white bg-red-500 rounded-md">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

            </div>
          );
      default:
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
            {['job-offerings', 'application', 'hiring notice', 'portfolio' , 'user management'].map((tab) => (
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
