import React, { useState, useEffect } from "react";
import { FaMicrophone } from "react-icons/fa";
import annyang from "annyang";
import axios from "axios";

const VoiceCommand: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  // Check if SpeechRecognition is supported
  useEffect(() => {
    if (!("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
      console.log("Speech Recognition is not supported, using annyang for fallback.");
    }
  }, []);

  // Start listening to voice commands
  const startListening = () => {
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      console.log("Speech Recognition API is supported");

      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.interimResults = false;
      recognition.continuous = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const command = event.results[0][0].transcript.toLowerCase();
        setTranscript(command);
        handleCommand(command);
      };

      recognition.onend = () => {
        setIsListening(false);
        setTimeout(() => setIsModalOpen(false), 1000); // Close modal after finishing
      };

      recognition.start();
    } else if (annyang) {
      console.log("Using annyang for voice recognition");

      // Typecast `annyang` to `any` to bypass TypeScript errors
      (annyang as any).start();
      setIsListening(true);

      (annyang as any).addCallback("result", (commands: string[]) => {
        const command = commands[0].toLowerCase();
        setTranscript(command);
        handleCommand(command);
      });

      (annyang as any).addCallback("end", () => {
        setIsListening(false);
        setTimeout(() => setIsModalOpen(false), 1000); // Close modal after finishing
      });
    } else {
      alert("Your browser does not support Speech Recognition. Please use Chrome or Edge.");
    }
  };

  // Handle specific commands and connect to API
  const handleCommand = async (command: string) => {
    switch (command) {
      case "login":
        alert("Navigating to Login.tsx");
        // Example API call for login
        try {
          const response = await axios.post("/api/login", { username: "user", password: "password" });
          console.log("Login successful:", response.data);
        } catch (error) {
          console.error("Error logging in:", error);
        }
        break;
      case "sign up":
        alert("Navigating to SignUp.tsx");
        // Example API call for sign-up
        try {
          const response = await axios.post("/api/signup", { username: "newUser", password: "newPassword" });
          console.log("Sign up successful:", response.data);
        } catch (error) {
          console.error("Error signing up:", error);
        }
        break;
      case "profile":
        alert("Navigating to Profile");
        // Example API call to get user profile
        try {
          const response = await axios.get("/api/profile");
          console.log("Profile data:", response.data);
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
        break;
      case "job search":
        alert("Navigating to Job Search");
        // Example API call for job search
        try {
          const response = await axios.get("/api/job-search");
          console.log("Job search results:", response.data);
        } catch (error) {
          console.error("Error fetching job search results:", error);
        }
        break;
      case "explore companies":
        alert("Navigating to Explore Companies");
        // Example API call for companies
        try {
          const response = await axios.get("/api/companies");
          console.log("Companies data:", response.data);
        } catch (error) {
          console.error("Error fetching companies:", error);
        }
        break;
      case "career advice":
        alert("Navigating to Career Advice");
        // Example API call for career advice
        try {
          const response = await axios.get("/api/career-advice");
          console.log("Career advice data:", response.data);
        } catch (error) {
          console.error("Error fetching career advice:", error);
        }
        break;
      default:
        alert(`Unknown command: ${command}`);
    }
  };

  return (
    <>
      {/* Voice Command Button */}
      <button
        onClick={() => {
          setIsModalOpen(true);
          startListening();
        }}
        className="fixed bottom-5 left-5 bg-blue-600 text-white p-5 rounded-full shadow-lg hover:bg-blue-700 transform transition-all duration-300"
        style={{ fontSize: "2rem" }}
        aria-label="Activate Voice Command"
      >
        <FaMicrophone />
      </button>

      {/* Modal for Voice Command */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          onClick={() => {
            if (!isListening) setIsModalOpen(false);
          }}
        >
          <div
            className="bg-white rounded-xl p-6 w-2/3 md:w-1/2 lg:w-1/3 text-center relative shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Voice Command</h2>
            {isListening ? (
              <div className="wave-container flex items-center justify-center">
                {/* Wave effect */}
                <div className="wave wave1"></div>
                <div className="wave wave2"></div>
                <div className="wave wave3"></div>
              </div>
            ) : (
              <p className="text-gray-700">Say a command like "Login", "Sign Up", etc.</p>
            )}

            <p className="text-sm text-gray-500 mt-4">Transcript: {transcript}</p>

            <button
              className="absolute top-3 right-0 text-gray-400 hover:text-gray-600"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Wave Effect CSS */}
      <style>{`
        .wave-container {
          position: relative;
          width: 100px;
          height: 100px;
        }

        .wave {
          position: absolute;
          width: 100%;
          height: 100%;
          border: 4px solid #4f46e5;
          border-radius: 50%;
          animation: wave 1.5s infinite;
        }

        .wave1 {
          animation-delay: 0s;
        }

        .wave2 {
          animation-delay: 0.5s;
        }

        .wave3 {
          animation-delay: 1s;
        }

        @keyframes wave {
          0% {
            transform: scale(0.5);
            opacity: 1;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
};

export default VoiceCommand;
