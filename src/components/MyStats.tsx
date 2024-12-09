import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MyStats: React.FC = () => {
  const [statsData] = useState({
    proposals: 180,
    proposalsSent: 160,
    wereViewed: 140,
    interviews: 90,
    hires: 60,
  });

  const [earnings, setEarnings] = useState(0);

  useEffect(() => {
    const earningsFromHires = statsData.hires * 50;
    setEarnings(earningsFromHires);
  }, [statsData]);

  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1); // Go back if there is a history
    } else {
      navigate('/'); // Fallback to home
    }
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-6 shadow-lg rounded-lg space-y-8">
      <button
  onClick={handleBack}
  className="text-teal-500 hover:underline mb-6"
>
  &lt; Back
</button>



        {/* Header with My Stats centered */}
        <h1 className="text-4xl font-bold text-teal-500 text-center mb-6" role="heading" aria-level={1}>
          My Stats
        </h1>

        {/* Earnings Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-teal-500 mb-4">Earnings</h2>
          <div className="text-4xl font-semibold">${earnings}</div>
          <div className="mt-4 text-teal-500">Earned from Hires</div>
        </div>

        {/* Stats Section with Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Proposals */}
          <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm text-center">
            <h3 className="text-xl font-semibold mb-4">Proposals</h3>
            <div className="text-3xl font-semibold">{statsData.proposals || 'Loading...'}</div>
            <div className="mt-4 text-teal-500">Total Proposals</div>
          </div>

          {/* Proposals Sent */}
          <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm text-center">
            <h3 className="text-xl font-semibold mb-4">Proposals Sent</h3>
            <div className="text-3xl font-semibold">{statsData.proposalsSent || 'Loading...'}</div>
            <div className="mt-4 text-indigo-500">Proposals Sent</div>
          </div>

          {/* Were Viewed */}
          <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm text-center">
            <h3 className="text-xl font-semibold mb-4">Were Viewed</h3>
            <div className="text-3xl font-semibold">{statsData.wereViewed || 'Loading...'}</div>
            <div className="mt-4 text-green-500">Views</div>
          </div>

          {/* Interviews */}
          <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm text-center">
            <h3 className="text-xl font-semibold mb-4">Interviews</h3>
            <div className="text-3xl font-semibold">{statsData.interviews || 'Loading...'}</div>
            <div className="mt-4 text-yellow-500">Interviews</div>
          </div>

          {/* Hires */}
          <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm text-center">
            <h3 className="text-xl font-semibold mb-4">Hires</h3>
            <div className="text-3xl font-semibold">{statsData.hires || 'Loading...'}</div>
            <div className="mt-4 text-pink-500">Successful Hires</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyStats;
