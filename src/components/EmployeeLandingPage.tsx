import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

interface jobHiring {
  jobName: string;
  jobDesc: string;
}

const EmployeeLandingPage = () => {
  const [activeTab, setActiveTab] = useState('Home'); // State for active tab
  const [currentSlide, setCurrentSlide] = useState(0); // State for slideshow
  const accountName = localStorage.getItem("accountName");
  const accountId = localStorage.getItem("id");
  const slides = ["/slide1.png", "/slide2.png"];
  const slideInterval = 5000; // 5 seconds per slide
  const [jobDetails, setJobDetails] = useState<jobHiring[]>([]);
  const serverUrl = import.meta.env.VITE_APP_SERVERHOST;
  const [letter, setLetter] = useState<string>('');
  
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLetter(event.target.value);  // Update parent state with the letter content
  };

  const retrieveData = async () => {
    try {
      const response = await axios.get(serverUrl + "retrieve_job");
      setJobDetails(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedJobTitle, setSelectedJobTitle] = useState<string>(''); // Track the selected job title

  const apply = async () => {
    // Access the current value when submitting
    try {
      const response = await axios.post(serverUrl + "apply", { id: accountId, title: "Job Application for " + selectedJobTitle, content: letter });
      if (response.data.remarks === "success") {
        alert("Application has been submitted");
      } else {
        alert("Something went wrong.");
      }
      setLetter("");
      toggleModal();
    } catch (error) {
      console.log(error);
    }
  };

  const toggleModal = (jobTitle?: string) => {
    setSelectedJobTitle(jobTitle || ''); // Set the job title when the modal is opened
    setIsModalVisible(!isModalVisible);
  };

  useEffect(() => {
    retrieveData();
  }, []);

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
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-teal-400 shadow-neon' : 'bg-gray-400'}`}
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
              {jobDetails.map((job, index) => (
                <div
                  key={index}
                  className="w-full p-6 text-center bg-white rounded-lg shadow-lg sm:w-64"
                >
                  <h3 className="text-lg font-bold text-gray-800">{job.jobName}</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    {job.jobDesc}
                  </p>
                  <button onClick={() => toggleModal(job.jobName)} className="px-4 py-2 mt-4 text-white bg-teal-500 rounded-lg hover:bg-teal-600">
                    Apply
                  </button>
                </div>
              ))}
            </div>
          </>
        );
      case 'Tutorials':
        break;
      case 'Contact':
        return <div className="p-4 md:p-8">Get in touch with us via the Contact section.</div>;
      default:
        return <div className="p-4 md:p-8">Welcome to the Home Page!</div>;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="fixed top-0 left-0 z-10 flex flex-col items-center justify-between w-full bg-white shadow-lg p-7 sm:flex-row sm:items-center sm:p-2">
        {/* Logo */}
        <img src="/Logoo.png" alt="Logo" className="mb-4 h-14 sm:mb-0" />

        {/* Tabs */}
        <div className="flex items-center justify-center gap-4">
          {['Home', 'Tutorials', 'Contact'].map((tab) => (
            <button
              key={tab}
              className={`text-sm font-medium sm:text-lg ${activeTab === tab ? 'border-b-2 border-teal-500' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Greeting, Search Bar, and Profile Image */}
        <div className="flex items-center gap-4 mt-4 sm:flex-row sm:mt-0">
          {/* Greeting */}
          <span className="text-sm font-medium text-gray-700 sm:text-lg">
            Welcome, {accountName}
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

          {/* Profile Image */}
          <div className="relative w-10 h-10">
            <img
              src="/profile.png"
              alt="Profile"
              className="object-cover w-full h-full rounded-full border-2 border-teal-500"
            />
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

      {/* Modal */}
      <Modal
        isVisible={isModalVisible}
        onClose={() => toggleModal()}
        jobTitle={selectedJobTitle}
        letter={letter}  // Pass down the state as a prop
        onChange={handleChange}  // Handle text change
        onApply={apply}  // Handle apply button click
      />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f7f7f7',
    fontFamily: 'Arial, sans-serif',
  },
  toggleButton: {
    padding: '12px 24px',
    fontSize: '16px',
    backgroundColor: '#2d87f0',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  toggleButtonHover: {
    backgroundColor: '#1f6cc1',
  },
  overlay: {
    position: 'fixed' as 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    width: '400px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    textAlign: 'center' as 'center',
  },
  modalTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px',
  },
  input: {
    width: '100%',
    padding: '12px',
    margin: '10px 0',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  inputFocus: {
    borderColor: '#2d87f0',
  },
  button: {
    padding: '12px 24px',
    backgroundColor: '#2d87f0',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    margin: '10px 0',
  },
  buttonHover: {
    backgroundColor: '#1f6cc1',
  },
  jobCard: {
    backgroundColor: 'white',
    padding: '20px',
    margin: '15px',
    width: '250px',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    transition: 'box-shadow 0.3s',
  },
  jobCardHover: {
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
  },
  header: {
    padding: '20px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    position: 'sticky' as 'sticky',
    top: 0,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
  },
  navLink: {
    margin: '0 15px',
    fontSize: '18px',
    color: '#333',
    cursor: 'pointer',
    textDecoration: 'none',
  },
  activeLink: {
    color: '#2d87f0',
    borderBottom: '2px solid #2d87f0',
  },
  footer: {
    padding: '20px',
    backgroundColor: '#fff',
    textAlign: 'center',
    marginTop: '20px',
    boxShadow: '0 -4px 8px rgba(0, 0, 0, 0.1)',
  },
};


const Modal: React.FC<{
  isVisible: boolean;
  onClose: () => void;
  jobTitle: string;
  letter: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onApply: () => void;
}> = ({ isVisible, onClose, jobTitle, letter, onChange, onApply }) => {
  if (!isVisible) return null;
  
  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.modalTitle}>{jobTitle}</h2>
        <textarea
          placeholder="Write a short letter..."
          style={styles.input}
          rows={5}
          value={letter}  // Bind textarea value to the parent state
          onChange={onChange}  // Update parent state when typing
        />
        <div>
          <button style={styles.button} onClick={onClose}>Close</button>
          <button style={styles.button} onClick={onApply}>Apply</button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLandingPage;
