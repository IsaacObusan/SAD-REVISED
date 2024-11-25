import React, { useState, useEffect } from 'react';

const EmployeeLandingPage = () => {
  const [activeTab, setActiveTab] = useState('Home'); // State for active tab
  const [currentSlide, setCurrentSlide] = useState(0); // State for slideshow

  const slides = ["/slide1.png", "/slide2.png"];
  const slideInterval = 5000; // 5 seconds per slide

  // Automated slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, slideInterval);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [slides.length]);

  // Function to render the content based on the active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'Home':
        return (
          <>
            {/* Slideshow Section */}
            <div className="relative mt-40 w-full max-w-4xl mx-auto overflow-hidden">
  {/* Background with gradient animation */}
  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 animate-gradient-blur z-0" />

  {/* Slides */}
  <div
    className="relative z-10 flex transition-transform duration-1000 ease-in-out"
    style={{
      transform: `translateX(-${currentSlide * 100}%)`, // Move slides horizontally
    }}
  >
    {slides.map((slide, index) => (
      <img
        key={index}
        src={slide}
        alt={`Slide ${index + 1}`}
        className="object-cover w-full h-auto rounded-lg shadow-md transform-gpu"
        style={{
          transform: `perspective(1000px) rotateY(${currentSlide === index ? 0 : 45}deg)`,
          boxShadow: '0 4px 15px rgba(0, 255, 255, 0.7)', // Add neon glow
        }}
      />
    ))}
  </div>

  {/* Slide indicators */}
  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
    {slides.map((_, index) => (
      <button
        key={index}
        onClick={() => setCurrentSlide(index)}
        className={`w-3 h-3 rounded-full transition-all duration-300 ${
          currentSlide === index ? 'bg-teal-400 shadow-neon' : 'bg-gray-400'
        }`}
        style={{
          boxShadow: currentSlide === index ? '0 0 10px teal' : 'none',
        }}
      ></button>
    ))}
  </div>
</div>


            {/* Job Search Section */}
            <div className="flex flex-col items-center justify-center p-4 mt-8 text-center bg-gray-100 md:p-8">
              <h2 className="text-lg font-bold text-gray-600 md:text-2xl">Find Your Dream Job</h2>
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
              {['Software Engineer', 'Data Analyst', 'UX/UI Designer'].map((title, index) => (
                <div
                  key={index}
                  className="w-full p-6 text-center bg-white rounded-lg shadow-lg sm:w-64"
                >
                  <h3 className="text-lg font-bold text-gray-800">{title}</h3>
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
              ))}
            </div>
          </>
        );
      case 'Tutorials':
        // Same as before
        break;
      case 'Contact':
        return <div className="p-4 md:p-8">Get in touch with us via the Contact section.</div>;
      default:
        return <div className="p-4 md:p-8">Welcome to the Home Page!</div>;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 z-10 flex flex-col items-center justify-between w-full bg-white shadow-lg p-7 sm:flex-row sm:items-center sm:p-2">
        {/* Logo */}
        <img src="/Logoo.png" alt="Logo" className="mb-4 h-14 sm:mb-0" />

        {/* Tabs */}
        <div className="flex items-center justify-center gap-4">
          {['Home', 'Tutorials', 'Contact'].map((tab) => (
            <button
              key={tab}
              className={`text-sm font-medium sm:text-lg ${
                activeTab === tab ? 'border-b-2 border-teal-500' : ''
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Greeting and Search Bar */}
        <div className="flex flex-col items-center gap-2 mt-4 sm:flex-row sm:mt-0">
          {/* Greeting */}
          <span className="text-sm font-medium text-gray-700 sm:text-lg">
            Welcome, user@example.com
          </span>

          {/* Search Bar */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-2 border border-gray-900 rounded-full sm:w-48 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            <button className="p-2 bg-teal-500 rounded-full">
              <img src="/Microphone.png" alt="Mic" className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 mt-20 md:p-8">{renderContent()}</main>

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

export default EmployeeLandingPage;
