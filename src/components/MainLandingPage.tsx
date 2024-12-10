import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import AccessibilityTool from './AccessibilityTool';



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

  {/* Caption on the Left Side and Bigger Font */}
  <div className="absolute top-9 right-10 text-right text-white bg-opacity-75 py-6 px-12 rounded-lg">
    <p className="text-3xl font-bold">Find Inclusive Job Opportunities for PWDs</p>
  </div>

  {/* Button to navigate to SignUp */}
  <button
  onClick={() => navigate('/sign-up')}
  className="absolute w-1/5 px-4 py-3 text-xl text-black transition-all duration-300 bg-transparent border-2 border-teal-500 rounded-lg right-12 bottom-32 hover:bg-teal-500 hover:text-white hover:border-teal-600"
>
  Sign Up
</button>


  {/* Learn More Button beside Sign Up Button */}
  <button
  onClick={() => navigate('/more-info')}
  className="absolute w-1/5 px-4 py-3 text-xl text-black transition-all duration-300 bg-transparent border-2 border-teal-500 rounded-lg right-12 bottom-10 hover:bg-teal-500 hover:text-white"
>
  Learn More
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
  {[
    {
      title: 'Software Engineer',
      description: 'Develop and maintain web applications.',
      budget: '$100/month',
      rating: 5,
      company: 'Tech Innovations',
      location: 'New York, NY', // Job location
      logo: 'https://via.placeholder.com/50', // Placeholder logo URL
    },
    {
      title: 'Data Analyst',
      description: 'Analyze data to help companies make decisions.',
      budget: '$120/month',
      rating: 4.5,
      company: 'DataCorp',
      location: 'San Francisco, CA', // Job location
      logo: 'https://via.placeholder.com/50', // Placeholder logo URL
    },
    {
      title: 'UX/UI Designer',
      description: 'Design user-friendly interfaces for apps and websites.',
      budget: '$150/month',
      rating: 4.8,
      company: 'Creative Studios',
      location: 'Austin, TX', // Job location
      logo: 'https://via.placeholder.com/50', // Placeholder logo URL
    },
  ].map((job, index) => (
    <div
      key={index}
      className="w-full p-6 text-left bg-white rounded-lg shadow-md sm:w-80"
    >
      <div className="flex items-center mb-4">
        <img
          src={job.logo}
          alt={`${job.company} logo`}
          className="w-12 h-12 rounded-full mr-4"
        />
        <h3 className="text-lg font-bold text-green-700">{job.title}</h3>
      </div>
      <p className="mt-2 text-sm text-gray-700">{job.description}</p>
      <div className="mt-4 text-xs text-gray-500">
        <span>Estimated Budget: </span>
        <span className="font-bold text-gray-800">{job.budget}</span>
      </div>
     
      <div className="mt-4 text-sm font-medium text-green-600">{job.company}</div>
      {/* Job Location */}
      <div className="mt-2 text-sm text-gray-600">{job.location}</div>
      <div className="flex justify-between mt-6">
        {/* Apply Now Button */}
        <button className="px-5 py-3 text-sm font-medium text-white bg-teal-500 rounded-md hover:bg-teal-600">
          Apply Now
        </button>

        {/* Save Job Button */}
        <button className="px-5 py-3 text-sm font-medium text-white bg-teal-500 rounded-md hover:bg-teal-600">
          Save Job
        </button>
</div>



    </div>
                )
              )}
           </div>

{/* Small Frame with Get Tips Button */}
<div className="flex justify-center mt-12">
  <div className="w-full max-w-2xl p-6 text-center bg-gray-100 border-2 border-gray-300 rounded-lg shadow-md">
    {/* Icon */}
    <div className="flex justify-center mb-4">
      <img
        src="/tips-icon.png"
        alt="Tips Icon"
        className="w-12 h-12"
      />
    </div>
    <h3 className="text-xl font-bold text-gray-800">Career Tips</h3>
    <p className="mt-2 text-sm text-gray-600">
      Discover expert advice and insights to advance your career and make an impact.
    </p>
    <button
      onClick={() => setActiveTab('Career Advice')}
      className="px-4 py-2 mt-4 text-white bg-teal-500 border-white-400 rounded-lg hover:bg-gray-300"
    >
      Get Tips
    </button>
  </div>
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
            return (
              <div className="flex flex-col items-center justify-center p-8 bg-gray-100">
                {/* Explore Companies Frame */}
                <div className="p-8 border-4 border-teal-500 rounded-lg bg-white w-full max-w-4xl">
                  <h2 className="text-2xl font-bold text-gray-800 text-center">Search Companies</h2>
                  <p className="mt-4 text-center text-gray-600">
                    Search for companies that are inclusive and offer opportunities to the PWD community.
                  </p>
          
                  {/* Search Box with Microphone Button on the Right */}
                  <div className="flex items-center justify-center mt-8">
                    <input
                      type="text"
                      placeholder="Search for companies..."
                      className="w-full max-w-xs p-2 border border-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <button className="ml-2 p-2 bg-teal-500 rounded-full">
                      <img src="/Microphone.png" alt="Mic" className="w-6 h-6" />
                    </button>
                  </div>
                </div>
          
                {/* Find Employer Cards Section (Outside the Frame) */}
                <section className="px-4 mt-12 sm:px-8 w-full">
                  <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">Explore Companies</h2>
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
          
                        
                        {/* Explore Button */}
                        <button className="w-full px-4 py-2 mt-4 text-white border-2 border-white rounded-lg hover:bg-teal-500 hover:text-white">
                          Explore
                        </button>
                      </div>
                    ))}
                  </div>
          
                  {/* Pagination Section */}
                  <div className="flex items-center justify-center gap-4 mt-8">
                    {/* Previous Button */}
                    <button className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600">
                      Previous
                    </button>
          
                    {/* Page Number Box (Placeholder for number of cards) */}
                    <div className="flex items-center gap-4">
                      <span className="text-lg text-gray-600">Page</span>
                      <input
                        type="text"
                        value="1" // Placeholder value, representing the current page or number of cards
                        className="w-12 p-2 text-center border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        disabled
                      />
                      <span className="text-lg text-gray-600">of 1</span> {/* Placeholder for total pages */}
                    </div>
          
                    {/* Next Button */}
                    <button className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600">
                      Next
                    </button>
                  </div>
                </section>
              </div>
            );
          
         
          

case 'Career Advice':
  return (
    <div className="flex flex-col items-center p-8">
      {/* Autoplay Video Slider with Caption Inside */}
      <div className="relative w-full mb-20">
        <div className="w-full h-96 overflow-hidden"> {/* Adjusted height to h-96 */}
          <video autoPlay loop muted className="w-full h-full object-cover">
            <source src="/path/to/your/video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-30">
          <h2 className="text-3xl text-white font-bold text-center">
            Let Job Compass empower your career journey by guiding you .
          </h2>
        </div>
        <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-transparent border-2 border-white px-6 py-3 rounded-full opacity-80 hover:bg-white hover:text-black">
          Watch Now

                    </button>
              
                  </div>
            
                  {/* Career Advice Content */}
                  <h2 className="text-2xl font-bold text-gray-800 text-center">
                    Career Advice for PWDs
                  </h2>
                  <p className="mt-4 text-center text-gray-600">
                    Discover tips and guidance to navigate your career journey.
                  </p>
      
                  {/* Advice Cards */}
                  <div className="flex flex-wrap justify-center gap-6 mt-8">
                    {[
                      {
                        title: 'Resume Tips',
                        description:
                          'Learn how to highlight your unique skills and experiences effectively.',
                        icon: '/icon_resume.png',
                      },
                      {
                        title: 'Interview Prep',
                        description:
                          'Ace your interviews with these practical tips and strategies.',
                        icon: '/icon_interview.png',
                      },
                      {
                        title: 'Networking',
                        description:
                          'Build meaningful connections to enhance your career opportunities.',
                        icon: '/icon_networking.png',
                      },
                      {
                        title: 'Skill Development',
                        description:
                          'Explore training programs and resources to upskill and grow.',
                        icon: '/icon_skills.png',
                      },
                    ].map((advice, index) => (
                      <div
                        key={index}
                        className="w-full p-6 text-center bg-white rounded-lg shadow-lg sm:w-64"
                      >
                        <img
                          src={advice.icon}
                          alt={advice.title}
                          className="w-16 h-16 mx-auto mb-4"
                        />
                        <h3 className="text-lg font-bold text-gray-800">
                          {advice.title}
                        </h3>
                        <p className="mt-2 text-sm text-gray-600">
                          {advice.description}
                        </p>
                      </div>
                    ))}
                  </div>
                  {/* Bottom Frames with Buttons */}
      <div className="mt-12 w-full max-w-screen-md space-y-6">
        <div className="flex flex-col items-center justify-between p-6 bg-white rounded-lg shadow-lg sm:flex-row">
          <div>
            <h3 className="text-lg font-bold text-gray-800">Find Job Opportunities</h3>
            <p className="mt-2 text-sm text-gray-600">
              Browse jobs tailored for persons with disabilities and take the first step in your career.
            </p>
          </div>
          <button className="mt-4 sm:mt-0 px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            Explore Jobs
          </button>
        </div>
        <div className="flex flex-col items-center justify-between p-6 bg-white rounded-lg shadow-lg sm:flex-row">
          <div>
            <h3 className="text-lg font-bold text-gray-800">Access Training Programs</h3>
            <p className="mt-2 text-sm text-gray-600">
              Enroll in training courses designed to empower and enhance your skills.
            </p>
          </div>
          <button className="mt-4 sm:mt-0 px-6 py-3 text-white bg-green-600 rounded-lg hover:bg-green-700">
            Start Learning
          </button>
        </div>
      </div>
{/* Subscribe Frame with Icon at the Top of Caption */}
<div className="mt-12 flex flex-col items-center justify-between p-6 bg-white rounded-lg shadow-lg sm:flex-row">
  <div className="w-full sm:w-80 space-y-4 mt-6 sm:mt-0">
    {/* Icon Above the Caption */}
    <div className="flex justify-center mb-4">
      <img src="/path/to/your/icon.png" alt="Career Advice Icon" className="w-8 h-8" />
    </div>
    <h3 className="text-lg font-bold text-gray-800 text-center">Subscribe to Career Advice</h3>
    <p className="mt-2 text-sm text-gray-600 text-center">
      Get expert career advice delivered to your inbox.
    </p>
    {/* Form and Button */}
    <input
      type="text"
      placeholder="First name"
      className="w-full p-3 border rounded-lg"
    />
    <input
      type="text"
      placeholder="Last name"
      className="w-full p-3 border rounded-lg"
    />
    <input
      type="email"
      placeholder="Email"
      className="w-full p-3 border rounded-lg"
    />
    <button className="w-full py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
      Subscribe
    </button>
    <p className="mt-2 text-sm text-gray-600 text-center">
      You can cancel emails at any time. By clicking ‘subscribe’ you agree to Jobstreet’s Privacy Statement.
    </p>
  </div>
</div>





</div>

  );
          
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
      className={`px-4 py-2 text-lg font-medium ${
        activeTab === 'Job Search' ? 'text-teal-500' : 'text-gray-600'
      }`}
      onClick={() => setActiveTab('Job Search')}
    >
      Job Search
    </button>
    <button
      className={`px-4 py-2 text-lg font-medium ${
        activeTab === 'Profile' ? 'text-teal-500' : 'text-gray-600'
      }`}
      onClick={() => setActiveTab('Profile')}
    >
      Profile
    </button>
    <button
      className={`px-4 py-2 text-lg font-medium ${
        activeTab === 'Explore Companies' ? 'text-teal-500' : 'text-gray-600'
      }`}
      onClick={() => setActiveTab('Explore Companies')}
    >
      Explore Companies
    </button>
    <button
      className={`px-4 py-2 text-lg font-medium ${
        activeTab === 'Career Advice' ? 'text-teal-500' : 'text-gray-600'
      }`}
      onClick={() => setActiveTab('Career Advice')}
    >
      Career Advice
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
{activeTab !== 'Profile' && activeTab !== 'Explore Companies'  && activeTab !== 'Career Advice' && (
  <section className="px-4 mt-12 sm:px-8">
    <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">Explore Companies</h2>
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
  



    </div>
  );
};

export default MainLandingPage;
