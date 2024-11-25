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
  <img
    src={slides[currentSlide]}
    alt={`Slide ${currentSlide + 1}`}
    className="object-cover w-full h-auto rounded-lg shadow-md"
  />
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
          const tutorials = [
            {
              title: 'Getting Started with React',
              description: 'Learn the basics of React and how to set up your first project.',
              type: 'PDF',
              file: '/tutorials/react-basics.pdf',
              video: '/videos/react-basics.mp4',
              image: '/images/react.png',
            },
            {
              title: 'Understanding Tailwind CSS',
              description: 'Explore how to use Tailwind CSS for modern UI development.',
              type: 'Article',
              file: '/tutorials/tailwind-guide.pdf',
              video: '/videos/tailwind-guide.mp4',
              image: '/images/tailwind.png',
            },
            {
              title: 'State Management with Redux',
              description: 'Master state management with Redux and best practices.',
              type: 'Video',
              file: '/tutorials/redux-state.pdf',
              video: '/videos/redux-tutorial.mp4',
              image: '/images/redux.png',
            },
          ];
        
          return (
            <div className="flex flex-col items-center justify-center p-4 md:p-8">
              <h2 className="mb-6 text-2xl font-bold text-teal-500">Tutorials</h2>
              <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {tutorials.map((tutorial, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-start p-6 bg-white border rounded-lg shadow-lg"
                  >
                    <img
                      src={tutorial.image}
                      alt={tutorial.title}
                      className="w-full h-40 mb-4 rounded-lg object-cover"
                    />
                    <h3 className="text-lg font-bold text-gray-800">{tutorial.title}</h3>
                    <p className="mt-2 text-sm text-gray-600">{tutorial.description}</p>
                    <div className="flex items-center gap-4 mt-4">
                      <a
                        href={tutorial.file}
                        download
                        className="px-4 py-2 text-white bg-teal-500 rounded-lg hover:bg-teal-600"
                      >
                        Download
                      </a>
                      <a
                        href={tutorial.video}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                      >
                        Watch
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        
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
