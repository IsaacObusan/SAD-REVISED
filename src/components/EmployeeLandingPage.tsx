import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';


interface jobHiring {
  jobName: string;
  jobDesc: string;
}

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}


const tutorials = [
  { 
    title: "Tutorial 1", 
    videoUrl: "/tutorial1.mp4", 
    thumbnail: "/tutorial1-thumbnail.jpg" 
  },
  { 
    title: "Tutorial 2", 
    videoUrl: "/tutorial2.mp4", 
    thumbnail: "/tutorial2-thumbnail.jpg" 
  },
  { 
    title: "Tutorial 3", 
    videoUrl: "/tutorial3.mp4", 
    thumbnail: "/tutorial3-thumbnail.jpg" 
  },
];

const EmployeeLandingPage = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0); // State for slideshow
  const accountName = localStorage.getItem("accountName");
  const accountId = localStorage.getItem("id");
  const slides = ["/slide1.png", "/slide2.png"];
  const slideInterval = 5000; // 5 seconds per slide
  const [jobDetails, setJobDetails] = useState<jobHiring[]>([]);
  const serverUrl = import.meta.env.VITE_APP_SERVERHOST;
  const [letter, setLetter] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const handleLogout = () => {
    // Clear session-related data
    localStorage.removeItem('accountName'); // Remove specific items, if needed
    localStorage.removeItem('id'); // Remove the user ID from localStorage
  
    // Optional: Clear other session-related data if stored
    // localStorage.clear(); // If you want to clear all localStorage items
  
    // Redirect the user to the login page
    navigate('/login');
    
    // Log out message for debugging purposes
    console.log('Logging out...');
  };


  
  
  



  

const toggleDropdown = () => {
  setIsOpen((prev) => !prev);
};

  
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLetter(event.target.value);  // Update parent state with the letter content
  };

  const retrieveData = async () => {
    try {
      const response = await fetch(serverUrl + "retrieve_job");
      const data = await response.json();  // Assuming the response is JSON
      console.log("Data from fetch:", data);
      if (Array.isArray(data)) {
        setJobDetails(data);
      } else {
        console.error("Expected an array, but got:", data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  
  
  
  
  
  

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedJobTitle, setSelectedJobTitle] = useState<string>(''); // Track the selected job title

  const apply = async () => {
    try {
      const response = await axios.post<{ remarks: string }>(serverUrl + "apply", {
        id: accountId,
        title: "Job Application for " + selectedJobTitle,
        content: letter,
      });
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


  // Speech-to-text search bar functionality
  const [searchQuery, setSearchQuery] = useState('');

  const SpeechRecognition =
  window.SpeechRecognition || (window as any).webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

const handleMicClick = () => {
  if (recognition) {
    recognition.start();

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);  // Update searchQuery with the recognized speech
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event.error);
    };

    recognition.onend = () => {
      console.log('Speech recognition service has stopped');
    };
  } else {
    alert('Speech Recognition not supported in this browser.');
  }
};

  

  // Function to render the content based on the active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'Home':
        return (
          <>







           {/* Simplified Slideshow Section */}
           <div className="relative w-full max-w-4xl mx-auto mt-40 overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentSlide * 100}%)`, // Move slides horizontally
                }}
              >
                {slides.map((slide, index) => (
                  <img
                    key={index}
                    src={slide}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-auto rounded-lg"
                  />
                ))}
              </div>
              {/* Slide indicators */}
              <div className="absolute flex gap-2 transform -translate-x-1/2 bottom-4 left-1/2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-teal-400' : 'bg-gray-400'}`}
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
        case "Tutorials":
          return (
            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-600 md:text-2xl">Tutorials</h2>
              <div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 md:grid-cols-3">
                {tutorials.map((tutorial, index) => (
                  <div key={index} className="overflow-hidden bg-white rounded-lg shadow-lg">
                    <img
                      src={tutorial.thumbnail}
                      alt={tutorial.title}
                      className="object-cover w-full h-48"
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-semibold text-teal-600">{tutorial.title}</h3>
                      <div className="flex justify-between mt-4">
                        <button
                          className="w-full px-4 py-2 text-white bg-teal-500 rounded-lg hover:bg-teal-600"
                          onClick={() => setSelectedVideo(tutorial.videoUrl)}
                        >
                          Watch
                        </button>
                      </div>
                      <div className="mt-2">
                        <button
                          className="w-full px-4 py-2 text-white bg-teal-500 rounded-lg hover:bg-teal-600"
                          onClick={() => {
                            const a = document.createElement("a");
                            a.href = tutorial.videoUrl;
                            a.download = tutorial.videoUrl.split("/").pop() || "tutorial.mp4";
                            a.click();
                          }}
                        >
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {selectedVideo && (
                <div className="mt-8">
                  <h3 className="text-lg font-bold text-gray-600 md:text-2xl">Now Playing:</h3>
                  <video className="w-full mt-4 rounded-lg" controls>
                    <source src={selectedVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
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

  {/* Dropdowns aligned closer to the tabs */}
  <div className="flex items-center gap-2 ml-4">
    {/* First Dropdown */}
    <div className="relative">
      <select
        className="p-2 bg-white "
        defaultValue=""
      >
        <option value="" disabled>
          Find Work
        </option>
        <option value="Option1">Work</option>
        <option value="Option2">Saved Jobs</option>
        <option value="Option3">Proposals</option>
      </select>
    </div>

    {/* Second Dropdown */}
    <div className="relative">
      <select
        className="p-2 bg-white "
        defaultValue=""
      >
        <option value="" disabled>
          Deliver Work
        </option>
        <option value="Option1">Active</option>
        <option value="Option2">History</option>
        <option value="Option3">Hourly</option>
      </select>
    </div>
  </div>
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
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery state as user types
    placeholder="Search..."
    className="w-full p-2 border border-gray-900 rounded-full sm:w-48 focus:outline-none focus:ring-2 focus:ring-teal-400"
  />
  <button className="p-2 bg-teal-500 rounded-full" onClick={handleMicClick}>
    <img src="/Microphone.png" alt="Mic" className="w-6 h-6" />
  </button>
</div>


{/* Profile Button */}
<div className="relative">
        <button
          className="w-10 h-10 focus:outline-none"
          onClick={toggleDropdown}
        >
          <img
            src="/profile.png"
            alt="Profile"
            className="object-cover w-full h-full border-2 border-teal-500 rounded-full"
          />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 z-10 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-44">
            <ul className="text-gray-700">
              <li>
                <a
                  href="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Your Profile
                </a>
              </li>
              <li>
                <a
                  href="/stats"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  My Stats
                </a>
              </li>
              <li>
                <a
                  href="/settings"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Settings
                </a>
              </li>
              <li>
              <button
      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
      onClick={handleLogout}
    >
      Logout
    </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  </header>


       


      {/* Main Content */}
      <main className="flex-1 p-4 mt-20 md:p-8">{renderContent()}</main>

   

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
