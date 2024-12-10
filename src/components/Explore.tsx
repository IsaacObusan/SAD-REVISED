import React, { useState } from 'react';

const ExplorePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'About' | 'Jobs' | 'Reviews'>('About');
  const [jobs, setJobs] = useState<string[]>([]); // Placeholder for job listings
  const [reviews, setReviews] = useState<string[]>([]); // Placeholder for reviews
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleTabChange = (tab: 'About' | 'Jobs' | 'Reviews') => {
    setActiveTab(tab);
  };

  const handleSubmitReview = () => {
    if (rating > 0 && comment.trim() !== '') {
      setReviews([...reviews, `Rating: ${rating} - ${comment}`]);
      setShowModal(false);
      setRating(0);
      setComment('');
    } else {
      alert('Please provide a rating and a comment.');
    }
  };

  return (
    <div className="p-8 bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 text-center">Explore Company</h1>

      <div className="mt-6 text-center text-lg text-gray-600">
        <p>
          Discover opportunities, reviews, and more about companies that are inclusive and offer great job opportunities for the PWD community.
        </p>
      </div>

      <div className="w-full max-w-lg mx-auto mt-6 bg-white rounded-lg shadow-lg">
        <div className="w-full h-48 bg-gray-300">
          <img
            src="/cover-photo.png" // Replace with actual image path
            alt="Cover"
            className="object-cover w-full h-full"
          />
        </div>

        <div className="relative flex flex-col items-center w-full p-4 -mt-12 bg-white rounded-t-lg shadow-lg">
          <div className="w-24 h-24 bg-gray-300 border-4 border-white rounded-full">
            <img
              src="/profile-placeholder.png" // Replace with actual profile image path
              alt="Profile"
              className="object-cover w-full h-full rounded-full"
            />
          </div>

          <h1 className="mt-4 text-2xl font-bold text-gray-800">Company Name</h1>

          <div className="flex items-center mt-2">
            {[1, 2, 3, 4, 5].map((star, idx) => (
              <svg
                key={idx}
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className={`w-6 h-6 ${star <= 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                viewBox="0 0 16 16"
              >
                <path d="M8 12.26l3.16 2.09-1.2-4.18L12.97 6h-4.03L7.04 10.17 5.84 14.34 8 12.26z" />
              </svg>
            ))}
            <span className="ml-2 text-sm text-gray-600">4.0 stars</span>
          </div>

          <button
            className="px-4 py-2 mt-4 text-sm font-medium text-white bg-teal-500 rounded-lg hover:bg-teal-600"
            onClick={() => setShowModal(true)}
          >
            Write a Review
          </button>
        </div>
      </div>

      <div className="w-full mt-6 max-w-lg mx-auto bg-white rounded-lg shadow-lg">
        <div className="flex justify-center border-b">
          <button
            onClick={() => handleTabChange('About')}
            className={`px-6 py-2 text-sm font-medium ${activeTab === 'About' ? 'text-teal-500 border-teal-500 border-b-2' : 'text-gray-600'}`}
          >
            About Company
          </button>
          <button
            onClick={() => handleTabChange('Jobs')}
            className={`px-6 py-2 text-sm font-medium ${activeTab === 'Jobs' ? 'text-teal-500 border-teal-500 border-b-2' : 'text-gray-600'}`}
          >
            Jobs
          </button>
          <button
            onClick={() => handleTabChange('Reviews')}
            className={`px-6 py-2 text-sm font-medium ${activeTab === 'Reviews' ? 'text-teal-500 border-teal-500 border-b-2' : 'text-gray-600'}`}
          >
            Reviews
          </button>
        </div>

        <div className="p-4 mt-4">
          {activeTab === 'About' && <p className="text-sm text-gray-600">About the company...</p>}
          {activeTab === 'Jobs' && (jobs.length > 0 ? jobs.map((job, idx) => <p key={idx}>{job}</p>) : <p>No jobs available</p>)}
          {activeTab === 'Reviews' && (reviews.length > 0 ? reviews.map((review, idx) => <p key={idx}>{review}</p>) : <p>No reviews yet</p>)}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg">
            <h2 className="text-lg font-bold">Write a Review</h2>
            <div className="flex mt-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`w-8 h-8 ${star <= rating ? 'text-yellow-500' : 'text-gray-400'}`}
                >
                  ★
                </button>
              ))}
            </div>
            <textarea
              className="w-full p-2 mt-4 border rounded"
              rows={4}
              placeholder="Write your comment here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 text-sm font-medium text-white bg-teal-500 rounded-lg hover:bg-teal-600"
                onClick={handleSubmitReview}
              >
                Submit
              </button>
              <button
                className="px-4 py-2 ml-2 text-sm font-medium text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300"
                onClick={() => setShowModal(false)}
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

export default ExplorePage;
