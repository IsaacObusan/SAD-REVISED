import React, { useState } from 'react';

const JobListing: React.FC = () => {
  const [expectedSalary, setExpectedSalary] = useState('');
  const [quickApply, setQuickApply] = useState(false);
  const [saveJob, setSaveJob] = useState(false);

  const handleQuickApply = () => {
    setQuickApply(true);
  };

  const handleSaveJob = () => {
    setSaveJob(true);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      {/* Cover Photo Section */}
      <div className="w-full max-w-3xl bg-gray-300 h-48 rounded-t-lg relative">
        <img
          src="https://via.placeholder.com/1200x300" // Replace with your cover photo URL
          alt="Cover Photo"
          className="w-full h-full object-cover rounded-t-lg"
        />
      </div>

      {/* Profile Image Section */}
      <div className="w-full max-w-3xl -mt-16 flex justify-center">
        <div className="w-32 h-32 border-4 border-white rounded-full overflow-hidden shadow-lg">
          <img
            src="https://via.placeholder.com/150" // Replace with your profile image URL
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Job Details Section */}
      <div className="w-full max-w-3xl bg-white p-6 shadow rounded-lg mt-6">
        <h1 className="text-2xl font-bold">Sales Manager | Smart Mobility SaaS</h1>
        <p className="text-gray-600 mt-2">Tech Innovators Ltd.</p>
        <p className="text-gray-600 mt-2">Location: Jakarta, Indonesia</p>
        <div className="mt-4">
          <span className="font-medium">Job Type:</span> Full-time
          <br />
          <span className="font-medium">Posted:</span> 3 hours ago
        </div>

        {/* Expected Salary Section */}
        <div className="mt-6">
          <p className="font-semibold text-lg">Add expected salary to your profile for insights</p>
          <input
            type="text"
            value={expectedSalary}
            onChange={(e) => setExpectedSalary(e.target.value)}
            placeholder="Enter your expected salary"
            className="mt-2 p-2 border border-gray-300 rounded w-full"
          />
        </div>

        {/* Quick Apply & Save Job Buttons */}
        <div className="mt-4 flex gap-4">
          <button
            onClick={handleQuickApply}
            className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
          >
            Quick Apply
          </button>
          <button
            onClick={handleSaveJob}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Save Job
          </button>
        </div>

        {/* Convincing Questionnaire */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Convincing Questions</h2>
          <ul className="mt-2 space-y-2">
            <li>Are you a dynamic leader with a strategic mindset and able to manage a diverse team?</li>
            <li>Do you have a strong sales aptitude and an ability to negotiate and problem solve?</li>
          </ul>
        </div>

        {/* Company Description */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Company Description</h2>
          <p className="mt-2">
            We’re a world-leading smart mobility SaaS tech company with almost 2,000,000 active users, and we’re looking for a Sales Manager to join our team. Our teams are collaborative, vibrant, and fast-growing, and all team members are empowered with the freedom to influence our business with ideas that drive innovation and efficiency.
          </p>
        </div>

        {/* Responsibilities */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Responsibilities</h2>
          <ul className="mt-2 list-disc pl-5 space-y-2">
            <li>Achieve growth and sales targets by successfully coaching and managing your sales team.</li>
            <li>Implement a strategic sales plan that expands the company’s customer base and establishes a strong presence within the industry.</li>
            <li>Recruiting, objective setting, coaching, and training a top-class corporate sales team.</li>
            <li>Building a winning sales team of highly motivated and goal-driven professionals.</li>
            <li>Negotiating strategic partnerships and alliances to facilitate market entry.</li>
            <li>Mapping a market entry strategy and building a marketing and corporate communications program.</li>
          </ul>
        </div>

        {/* Requirements */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Requirements</h2>
          <ul className="mt-2 list-disc pl-5 space-y-2">
            <li>Ability to communicate in English is a must.</li>
            <li>Experience in managing sales people.</li>
            <li>Strong business acumen with an analytical mind.</li>
            <li>Natural winner, service driven, and entrepreneurial.</li>
            <li>Good brand and distribution awareness.</li>
            <li>Excellent communicator and relationship builder.</li>
            <li>Good team player, motivator, and ability to build a growing sales team.</li>
          </ul>
        </div>

        {/* Employer Questions */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Employer Questions</h2>
          <ul className="mt-2 space-y-2">
            <li>How many years' experience do you have as a Sales Supervisor?</li>
            <li>What’s your expected monthly basic salary?</li>
            <li>Which of the following types of qualifications do you have?</li>
            <li>How many years of people management experience do you have?</li>
            <li>How much notice are you required to give your current employer?</li>
            <li>How many years' experience do you have as a Business Development Manager?</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default JobListing;
