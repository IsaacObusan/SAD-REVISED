import React from 'react';

const CompanyProfile: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto mt-6 overflow-hidden bg-white border border-gray-200 rounded-lg shadow-md">
            {/* Cover Photo */}
            <div className="flex items-center justify-center w-full h-48 bg-gray-300">
                <h1 className="text-2xl font-bold text-white">Cover Photo</h1>
            </div>

            {/* Company Profile Section */}
            <div className="p-6">
                <h2 className="mb-4 text-xl font-semibold">Company Name</h2>
                <p className="mb-6 text-gray-600">This section contains a brief description of the company, its vision, mission, and other essential details to attract applicants.</p>

                {/* Job Information */}
                <div className="mb-6">
                    <p className="text-lg font-medium">Applying for: <span className="text-teal-600">Job Title</span></p>
                    <p className="text-gray-700">Location: <span className="font-medium">City, Country</span></p>
                    <p className="text-gray-700">Employment Type: <span className="font-medium">Part-Time / Full-Time</span></p>
                    <p className="text-gray-700">Salary: <span className="font-medium">₱50,000 - ₱60,000 / month</span></p>
                    <p className="text-gray-700">Date Posted: <span className="font-medium">December 15, 2024</span></p>
                </div>

                {/* Action Buttons */}
                <div className="flex mb-6 space-x-4">
                    <button className="px-4 py-2 text-white bg-teal-600 rounded hover:bg-teal-700">Apply</button>
                    <button className="px-4 py-2 text-white bg-teal-600 rounded hover:bg-teal-700">Save</button>
                </div>

                {/* Requirements Section */}
                <div>
                    <h3 className="mb-3 text-lg font-semibold">Requirements for Application:</h3>
                    <ul className="text-gray-700 list-disc list-inside">
                        <li>Requirement 1: Description</li>
                        <li>Requirement 2: Description</li>
                        <li>Requirement 3: Description</li>
                        <li>Requirement 4: Description</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CompanyProfile;
