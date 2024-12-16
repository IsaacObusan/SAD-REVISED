import { useState } from 'react';
import axios from 'axios';

interface EmployeeSignUp {
  fullname: string;
  email: string;
  age: string;
  password: string;
  cpassword: string;
  file_loc: string;
  link: string;
  disabilities: string[];
}

const SignUp = () => {
  const [activeTab, setActiveTab] = useState<'employee' | 'employer'>('employee');
  const [resume, setResume] = useState<File | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null); // Profile image state for employee
  const [coverPhoto, setCoverPhoto] = useState<File | null>(null); // Cover photo state for employer

  const [isModalOpen, setIsModalOpen] = useState(false);
  const serverUrl = import.meta.env.VITE_APP_SERVERHOST;
  const [signUpData, setSignUpData] = useState<EmployeeSignUp>({
    fullname: "",
    email: "",
    age: "",
    password: "",
    cpassword: "",
    file_loc: "",
    link: "",
    disabilities: [],
  });

  const handleSignUpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpData({ ...signUpData, [event.target.name]: event.target.value });
  };

  const handleTabClick = (tab: 'employee' | 'employer') => {
    setActiveTab(tab);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    // Logic for resume upload (original)
    if (file && (file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      setResume(file);
    } else if (file) {
      alert('Please upload a PDF or Word document.');
    }

    // Additional logic for profile image upload (employee)
    if (file && (file.type.startsWith('image/'))) {
      setProfileImage(file);
    } else if (file && file.type.startsWith('image/') === false) {
      alert('Please upload a valid image file (JPEG, PNG, etc.) for your profile image.');
    }

    // Additional logic for cover photo upload (employer)
    if (file && (file.type.startsWith('image/'))) {
      setCoverPhoto(file);
    } else if (file && file.type.startsWith('image/') === false) {
      alert('Please upload a valid image file (JPEG, PNG, etc.) for your cover photo.');
    }
  };

  const handleEmployeeSubmit = async () => {
    try {
      const response = await axios.post(serverUrl + "signup", signUpData);
      if (response.data.status) {
        setIsModalOpen(true);
      } else {
        console.log("Unable to sign up. Please try again.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDisabilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    setSignUpData((prevSignUpData) => {
      let updatedDisabilities = [...prevSignUpData.disabilities];

      if (checked) {
        updatedDisabilities.push(name);
      } else {
        updatedDisabilities = updatedDisabilities.filter((disability) => disability !== name);
      }

      return {
        ...prevSignUpData,
        disabilities: updatedDisabilities, // Update disabilities in the state
      };
    });
  };

  const handleNext = () => {
    setIsModalOpen(false);
  };

  // Trigger file input click when "Upload" button is clicked
  const triggerFileInput = () => {
    const fileInput = document.getElementById('resume-upload') as HTMLInputElement;
    fileInput?.click();
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-10">
      {/* Tab Navigation */}
      <div className="flex justify-between border-b-2 border-gray-300">
        <button
          onClick={() => handleTabClick('employee')}
          className={`py-2 w-1/2 text-center ${activeTab === 'employee' ? 'border-b-2 border-teal-500 font-semibold' : ''}`}
        >
          Employee
        </button>
        <button
          onClick={() => handleTabClick('employer')}
          className={`py-2 w-1/2 text-center ${activeTab === 'employer' ? 'border-b-2 border-teal-500 font-semibold' : ''}`}
        >
          Employer
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'employee' ? (
          <div className="space-y-4">
            {/* Employee Sign-Up Form */}
            <h2 className="text-xl font-bold text-center">Employee Sign-Up</h2>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                placeholder="Full Name"
                name="fullname"
                value={signUpData.fullname}
                onChange={handleSignUpChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={signUpData.email}
                onChange={handleSignUpChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
              <input
                type="number"
                placeholder="Age"
                name="age"
                value={signUpData.age}
                onChange={handleSignUpChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={signUpData.password}
                onChange={handleSignUpChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
               <input
                type="password"
                placeholder="Confirm Password"
                name="cpassword"
                value={signUpData.cpassword}
                onChange={handleSignUpChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
              {/* Profile Photo Upload */}
              <div>
                <label>Profile Photo Upload:</label>
                <input
                  type="file"
                  name="profileImage"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                {profileImage && <p>Selected: {profileImage.name}</p>}
              </div>

              {/* Resume Upload */}
              <div className="flex flex-col items-center space-y-2">
                <label
                  htmlFor="resume-upload"
                  className="w-full py-2 text-center text-white transition duration-300 bg-gray-500 rounded cursor-pointer hover:bg-gray-600"
                  onClick={triggerFileInput} // Trigger file input on button click
                >
                  Upload Resume
                </label>
                <input
                  id="resume-upload"
                  type="file"
                  accept=".pdf,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <p className="text-sm text-gray-500">You must upload a CV/Resume</p>
                {resume && <p className="text-sm text-green-600">Selected: {resume.name}</p>}
                <input
                  type="url"
                  placeholder="Portfolio Link"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <button
                type="button"
                onClick={handleEmployeeSubmit}
                className="w-full py-2 text-white bg-teal-500 rounded hover:bg-green-600"
              >
                Sign Up
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Employer Sign-Up Form */}
            <h2 className="text-xl font-bold text-center">Employer Sign-Up</h2>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                placeholder="Name"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="number"
                placeholder="Age"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-2 border border-gray-300 rounded"
              />
               <input
                type="password"
                placeholder="Confirm Password"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                placeholder="Company Name"
                className="w-full p-2 border border-gray-300 rounded"
              />


               {/* Profile Photo Upload */}
               <div>
                <label>Profile Photo Upload:</label>
                <input
                  type="file"
                  name="profileImage"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                {profileImage && <p>Selected: {profileImage.name}</p>}
              </div>
              
              {/* Cover Photo Upload */}
              <div>
                <label>Cover Photo Upload:</label>
                <input
                  type="file"
                  name="coverPhoto"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                {coverPhoto && <p>Selected: {coverPhoto.name}</p>}
              </div>
              <button className="w-full py-2 text-white bg-teal-500 rounded hover:bg-green-600">Sign Up</button>
            </form>
          </div>
        )}
      </div>

      {/* Modal for Disability Selection */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="p-6 bg-white rounded-md w-96">
            <h3 className="mb-4 text-xl font-bold text-center">Select Your Disabilities</h3>
            <form>
              <label className="block mb-2 text-sm font-semibold">Please select all that apply:</label>
              <div className="space-y-2">
                <div>
                  <input
                    type="checkbox"
                    id="visual"
                    name="visual"
                    checked={signUpData.disabilities.includes("Visual Impairment")}
                    onChange={handleDisabilityChange}
                    className="mr-2"
                  />
                  <label htmlFor="visual">Visual Impairment</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="hearing"
                    name="hearing"
                    checked={signUpData.disabilities.includes("Hearing Impairment")}
                    onChange={handleDisabilityChange}
                    className="mr-2"
                  />
                  <label htmlFor="hearing">Hearing Impairment</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="mobility"
                    name="mobility"
                    checked={signUpData.disabilities.includes("Mobility Impairment")}
                    onChange={handleDisabilityChange}
                    className="mr-2"
                  />
                  <label htmlFor="mobility">Mobility Impairment</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="cognitive"
                    name="cognitive"
                    checked={signUpData.disabilities.includes("Cognitive Impairment")}
                    onChange={handleDisabilityChange}
                    className="mr-2"
                  />
                  <label htmlFor="cognitive">Cognitive Impairment</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="speech"
                    name="speech"
                    checked={signUpData.disabilities.includes("Speech Impairment")}
                    onChange={handleDisabilityChange}
                    className="mr-2"
                  />
                  <label htmlFor="speech">Speech Impairment</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="others"
                    name="others"
                    checked={signUpData.disabilities.includes("Others")}
                    onChange={handleDisabilityChange}
                    className="mr-2"
                  />
                  <label htmlFor="others">Others</label>
                </div>
              </div>
              <button
                type="button"
                onClick={handleNext}
                className="w-full py-2 mt-4 text-white bg-teal-500 rounded hover:bg-green-600"
              >
                Next
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
