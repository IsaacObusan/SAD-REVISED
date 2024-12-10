import React, { useState } from 'react';

// Example list of international languages (can be extended)
const allLanguages = [
  'English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Russian', 'Arabic', 'Portuguese', 'Hindi', 'Bengali', 'Italian', 'Korean', 'Dutch', 'Turkish',
];

const YourProfile: React.FC = () => {
  const [name, setName] = useState('John Doe');
  const [location, setLocation] = useState('New York, USA');
  const [position, setPosition] = useState('Software Developer');
  const [description, setDescription] = useState(
    'Experienced developer specializing in web and mobile app development.'
  );
  const [rate, setRate] = useState('$50/hr');
  const [publishedPortfolios, setPublishedPortfolios] = useState([ 'Portfolio 1', 'Portfolio 2' ]);
  const [draftPortfolios, setDraftPortfolios] = useState([ 'Draft Portfolio 1', 'Draft Portfolio 2' ]);
  const [languagesUsed, setLanguagesUsed] = useState(['English', 'Spanish', 'French']);

  // Modal states
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(languagesUsed);
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/150');

  // Handle input changes for various profile fields
  const handleEdit = (field: string) => {
    alert(`Edit ${field}`);
  };

  const handleAddPortfolio = () => {
    alert('Add a new portfolio');
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const language = event.target.value;
    setSelectedLanguages((prevLanguages) =>
      prevLanguages.includes(language)
        ? prevLanguages.filter((lang) => lang !== language)
        : [...prevLanguages, language]
    );
  };

  const handleSaveLanguages = () => {
    setLanguagesUsed(selectedLanguages);
    setIsLanguageModalOpen(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result as string); // Update the profile image with the selected file
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      {/* Profile Section */}
      <div className="w-full max-w-3xl bg-white p-6 shadow rounded-lg">
        {/* Profile Image Section */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={profileImage}
              alt="Profile"
              className="w-24 h-24 rounded-full border border-gray-300 object-cover"
            />
            <label
              htmlFor="file-input"
              className="absolute bottom-0 right-0 bg-teal-500 text-white p-1 rounded-full cursor-pointer"
            >
              Edit
            </label>
            <input
              id="file-input"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">
                {name} <span className="text-gray-500">({rate})</span>
              </h1>
              <button
                className="text-sm text-teal-500 hover:underline"
                onClick={() => handleEdit('Name')}
              >
                Edit
              </button>
            </div>
            <p className="text-gray-600">{location}</p>
            <p className="text-gray-600">{position}</p>
            <button
              className="mt-2 text-sm text-teal-500 hover:underline"
              onClick={() => handleEdit('Location/Position')}
            >
              Edit
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold">About Me</h2>
          <p className="text-gray-700 mt-2">{description}</p>
          <button
            className="mt-2 text-sm text-teal-500 hover:underline"
            onClick={() => handleEdit('Description')}
          >
            Edit
          </button>
        </div>
      </div>

      {/* Portfolio Section */}
      <div className="w-full max-w-3xl bg-white p-6 shadow rounded-lg mt-6">
        <h2 className="text-lg font-semibold">Portfolio</h2>
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-800">Published</h3>
          <ul className="mt-2">
            {publishedPortfolios.map((portfolio, index) => (
              <li key={index} className="flex items-center justify-between py-1">
                <span>{portfolio}</span>
                <button
                  className="text-sm text-teal-500 hover:underline"
                  onClick={() => handleEdit(`Published Portfolio ${index + 1}`)}
                >
                  Edit
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-800">Drafts</h3>
          <ul className="mt-2">
            {draftPortfolios.map((portfolio, index) => (
              <li key={index} className="flex items-center justify-between py-1">
                <span>{portfolio}</span>
                <button
                  className="text-sm text-teal-500 hover:underline"
                  onClick={() => handleEdit(`Draft Portfolio ${index + 1}`)}
                >
                  Edit
                </button>
              </li>
            ))}
          </ul>
        </div>
        <button
          className="mt-4 px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
          onClick={handleAddPortfolio}
        >
          Add Portfolio
        </button>
      </div>

      {/* Languages Section */}
      <div className="w-full max-w-3xl bg-white p-6 shadow rounded-lg mt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Languages Spoken</h2>
          <button
            className="text-sm text-teal-500 hover:underline"
            onClick={() => setIsLanguageModalOpen(true)}
          >
            Edit
          </button>
        </div>
        <ul className="mt-2">
          {languagesUsed.map((language, index) => (
            <li key={index} className="py-1 text-gray-700">
              {language}
            </li>
          ))}
        </ul>
      </div>

      {/* Language Edit Modal */}
      {isLanguageModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Select Languages</h3>
            <div className="space-y-2">
              {allLanguages.map((language) => (
                <label key={language} className="block">
                  <input
                    type="checkbox"
                    value={language}
                    checked={selectedLanguages.includes(language)}
                    onChange={handleLanguageChange}
                    className="mr-2"
                  />
                  {language}
                </label>
              ))}
            </div>
            <div className="mt-4 flex justify-between">
              <button
                className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
                onClick={handleSaveLanguages}
              >
                Save
              </button>
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                onClick={() => setIsLanguageModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default YourProfile;
