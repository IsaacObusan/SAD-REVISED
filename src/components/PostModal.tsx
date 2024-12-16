import React, { useState } from 'react';

interface PostJobModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void; // Added onClose prop
}

const PostJobModal: React.FC<PostJobModalProps> = ({ showModal, setShowModal, onClose }) => {
  const [companyName, setCompanyName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [jobSalary, setJobSalary] = useState('');

  const handlePostJob = () => {
    // Logic to handle posting the job
    console.log({
      companyName,
      jobTitle,
      description,
      status,
      jobSalary,
    });
    setShowModal(false); // Close modal after submission
    onClose(); // Trigger the onClose callback
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-6 bg-white rounded shadow-lg w-[90%] max-w-lg">
        <h2 className="mb-4 text-xl font-bold text-gray-700">Post a New Job</h2>
        <div className="space-y-4">
          {/* Company Name Dropdown */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">
              Company Name
            </label>
            <select
              className="w-full px-3 py-2 border rounded-md focus:outline-teal-500"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            >
              <option value="" disabled>
                Select a company
              </option>
              <option value="Company A">Company A</option>
              <option value="Company B">Company B</option>
              <option value="Company C">Company C</option>
            </select>
          </div>

          {/* Job Title */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">
              Job Title
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md focus:outline-teal-500"
              placeholder="Enter job title"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">
              Description
            </label>
            <textarea
              className="w-full px-3 py-2 border rounded-md focus:outline-teal-500"
              rows={3}
              placeholder="Enter job description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          {/* Status */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">
              Status
            </label>
            <select
              className="w-full px-3 py-2 border rounded-md focus:outline-teal-500"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="" disabled>
                Select status
              </option>
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          {/* Job Salary */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">
              Job Salary
            </label>
            <input
              type="number"
              className="w-full px-3 py-2 border rounded-md focus:outline-teal-500"
              placeholder="Enter job salary"
              value={jobSalary}
              onChange={(e) => setJobSalary(e.target.value)}
            />
          </div>
        </div>

        {/* Modal Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            className="px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-white bg-teal-500 rounded hover:bg-teal-600"
            onClick={handlePostJob}
          >
            Enter
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostJobModal;
