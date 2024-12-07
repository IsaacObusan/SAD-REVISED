import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const MainLandingPage = () => {
  const [activeTab, setActiveTab] = useState('Job Search');
  const navigate = useNavigate();

  // Function to render the content based on the active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'Job Search':
        return (
          <>
          {/* Video Section with SignUp Button */}
<div className="relative mt-12 w-full h-[500px] flex justify-center items-center overflow-hidden">
  <video
    src="/jobcom.mp4"
    autoPlay
    loop
    muted
    className="object-cover w-full h-full rounded-lg shadow-md"
  ></video>
  {/* Button to navigate to SignUp */}
  <button
    onClick={() => navigate('/sign-up')}
    className="absolute w-1/5 px-4 py-3 text-xl text-black transition-all duration-300 bg-transparent border-2 border-teal-500 rounded-lg right-12 bottom-20 hover:bg-teal-500 hover:text-white hover:border-teal-600"
  >
    Sign Up
  </button>
</div>





            {/* Job Search Section */}
            <div className="flex flex-col items-center justify-center p-4 mt-8 text-center bg-gray-100 md:p-8">
              <h2 className="text-lg font-bold text-gray-600 md:text-2xl">
                Find Your Dream Job
              </h2>
              <div className="flex items-center gap-2 mt-4">
                <input
                  type="text"
                  placeholder="Search jobs..."
                  className="w-full max-w-xs p-2 border border-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <button className="p-2 bg-teal-500 rounded-full">
                  <img src="/Microphone.png" alt="Mic" className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Job Cards Section */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {['Software Engineer', 'Data Analyst', 'UX/UI Designer'].map(
                (title, index) => (
                  <div
                    key={index}
                    className="w-full p-6 text-center bg-white rounded-lg shadow-lg sm:w-64"
                  >
                    <h3 className="text-lg font-bold text-gray-800">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">
                      {title === 'Software Engineer'
                        ? 'Develop and maintain web applications.'
                        : title === 'Data Analyst'
                        ? 'Analyze data to help companies make decisions.'
                        : 'Design user-friendly interfaces for apps and websites.'}
                    </p>
                    <button className="px-4 py-2 mt-4 text-white bg-teal-500 rounded-lg hover:bg-teal-600">
                      Apply
                    </button>
                  </div>
                )
              )}
            </div>
          </>
        );
        case 'Profile':
          return (
            <div className="flex flex-col items-center justify-center p-8 bg-gray-100">
              {/* Main Profile Frame */}
              <div className="p-8 border-4 border-teal-500 rounded-lg bg-white">
                <h2 className="text-2xl font-bold text-gray-800 text-center">Your Profile</h2>
                <p className="mt-4 text-center text-gray-600">
                  You haven't created your profile yet. Let employers know more about you and your unique skills!
                </p>
  
                {/* Create Profile Button */}
                <div className="flex justify-center mt-6">
                  <button
                    onClick={() => navigate('/sign-up')} // Navigate to SignUp.tsx
                    className="px-6 py-2 text-teal-500 border-2 border-teal-500 bg-transparent rounded-lg hover:bg-teal-500 hover:text-white"
                  >
                    Create Profile
                  </button>
                </div>
              </div>
  
              {/* Additional Captions Section (Outside the Frame) */}
              <div className="mt-10 w-full max-w-4xl">
                <h3 className="text-center text-xl font-semibold text-gray-800 mb-6">
                  Empower Your Career Journey
                </h3>
                <div className="grid grid-cols-2 gap-8">
                  {/* Caption 1 */}
                  <div className="text-center">
                    <img
                      src="/icon_accessibility.png" // Replace with your local icon path
                      alt="Accessible Jobs Icon"
                      className="mx-auto mb-4 w-16 h-16"
                    />
                    <h4 className="text-lg font-bold text-gray-800">Accessible Job Opportunities</h4>
                    <p className="text-gray-600 mt-2">
                      Find job listings designed to meet the diverse needs of the PWD community.
                    </p>
                  </div>
  
                  {/* Caption 2 */}
                  <div className="text-center">
                    <img
                      src="/icon_visibility.png" // Replace with your local icon path
                      alt="Visibility Icon"
                      className="mx-auto mb-4 w-16 h-16"
                    />
                    <h4 className="text-lg font-bold text-gray-800">Showcase Your Abilities</h4>
                    <p className="text-gray-600 mt-2">
                      Highlight your unique skills and talents to attract inclusive employers.
                    </p>
                  </div>
  
                  {/* Caption 3 */}
                  <div className="text-center">
                    <img
                      src="/icon_support.png" // Replace with your local icon path
                      alt="Support Icon"
                      className="mx-auto mb-4 w-16 h-16"
                    />
                    <h4 className="text-lg font-bold text-gray-800">Community Support</h4>
                    <p className="text-gray-600 mt-2">
                      Connect with a supportive network of organizations and fellow job seekers.
                    </p>
                  </div>
  
                  {/* Caption 4 */}
                  <div className="text-center">
                    <img
                      src="/icon_empower.png" // Replace with your local icon path
                      alt="Empower Icon"
                      className="mx-auto mb-4 w-16 h-16"
                    />
                    <h4 className="text-lg font-bold text-gray-800">Empower Your Future</h4>
                    <p className="text-gray-600 mt-2">
                      Take control of your career with tools and resources tailored for success.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
      case 'Explore Companies':
        return <div className="p-4 md:p-8">Explore Companies Page Content</div>;
      default:
        return <div className="p-4 md:p-8">Welcome to the Landing Page!</div>;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 z-10 flex items-center justify-between w-full p-4 bg-white shadow-lg sm:p-8">
        {/* Logo */}
        <img src="/Logoo.png" alt="Logo" className="h-14" />

        {/* Tabs */}
        <div className="flex gap-4">
          <button
            className={`px-4 py-2 text-lg font-medium ${activeTab === 'Job Search' ? 'text-teal-500' : 'text-gray-600'}`}
            onClick={() => setActiveTab('Job Search')}
          >
            Job Search
          </button>
          <button
            className={`px-4 py-2 text-lg font-medium ${activeTab === 'Profile' ? 'text-teal-500' : 'text-gray-600'}`}
            onClick={() => setActiveTab('Profile')}
          >
            Profile
          </button>
          <button
            className={`px-4 py-2 text-lg font-medium ${activeTab === 'Explore Companies' ? 'text-teal-500' : 'text-gray-600'}`}
            onClick={() => setActiveTab('Explore Companies')}
          >
            Explore Companies
          </button>
        </div>

        {/* Button */}
        <button
          className="px-4 py-2 text-white bg-teal-500 rounded-lg hover:bg-teal-600"
          onClick={() => navigate('/login')}
        >
          Login
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 mt-28 md:p-8">{renderContent()}</main>

  {/* Find Employer Cards Section */}
{activeTab !== 'Profile' && activeTab !== 'Explore Companies' && (
  <section className="px-4 mt-12 sm:px-8">
    <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">Find Employer</h2>
    <div className="flex justify-center gap-4 overflow-x-scroll">
      {['Employer 1', 'Employer 2', 'Employer 3', 'Employer 4'].map((employer, index) => (
        <div
          key={index}
          className="flex-shrink-0 p-6 text-white transition-all duration-300 transform rounded-lg shadow-xl w-72 bg-gradient-to-r from-teal-500 to-teal-600 hover:scale-105"
        >
          {/* Employer Logo */}
          <div className="flex justify-center mb-4">
            <img
              src={`/${employer.toLowerCase().replace(' ', '-')}-logo.png`}
              alt={employer}
              className="w-16 h-16 rounded-full"
            />
          </div>

          <h3 className="text-2xl font-bold">{employer}</h3>
          <p className="mt-2 text-sm">
            Discover great job opportunities with {employer}. Join their team and accelerate your career.
          </p>

          {/* Rating */}
          <div className="flex items-center mt-4">
            {[1, 2, 3, 4, 5].map((star, idx) => (
              <svg
                key={idx}
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className={`w-5 h-5 ${star <= 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                viewBox="0 0 16 16"
              >
                <path d="M8 12.26l3.16 2.09-1.2-4.18L12.97 6h-4.03L7.04 10.17 5.84 14.34 8 12.26z" />
              </svg>
            ))}
          </div>

          {/* Explore Button */}
          <button className="w-full px-4 py-2 mt-4 text-white border-2 border-white rounded-lg hover:bg-teal-500 hover:text-white">
            Explore
          </button>
        </div>
      ))}
    </div>

    {/* See More Button */}
    <div className="flex justify-center mt-6">
      <button
        onClick={() => setActiveTab('Explore Companies')}
        className="px-6 py-2 text-white bg-teal-600 rounded-lg hover:bg-teal-500"
      >
        See More
      </button>
    </div>
  </section>
)}
  

      {/* Footer */}
      <footer className="flex flex-col items-center p-4 mt-auto text-gray-900 bg-white sm:p-8">
        <p className="mb-4 text-sm sm:text-base">In partnership with:</p>
        <div className="flex gap-4">
          <img src="/Pwd.png" alt="PWD" className="h-10 sm:h-12" />
          <img src="/Labor.png" alt="Labor" className="h-10 sm:h-12" />
        </div>
      </footer>
    </div>
  );
};

export default MainLandingPage;
