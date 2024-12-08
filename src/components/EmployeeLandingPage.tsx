import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Footer from './Footer';


interface jobHiring {
  jobName: string;
  jobDesc: string;
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

  // Function to render the content based on the active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'Home':
        return (
          <>
            {/* Slideshow Section */}
            <div className="relative w-full max-w-4xl mx-auto mt-40 overflow-hidden">
              {/* Background with gradient animation */}
              <div className="absolute top-0 left-0 z-0 w-full h-full bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 animate-gradient-blur" />

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
              <div className="absolute flex gap-2 transform -translate-x-1/2 bottom-4 left-1/2">
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
              className="object-cover w-full h-full border-2 border-teal-500 rounded-full"
            />
          </div>

{/* Logout Button */}
 {/* Logout Button */}
 <button
      onClick={() => {
        localStorage.clear(); // Clear local storage
        window.location.href = "/login"; // Redirect to login page
      }}
      className="text-sm font-medium text-gray-700 hover:text-teal-500 sm:text-lg"
    >
      Logout
    </button>
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
