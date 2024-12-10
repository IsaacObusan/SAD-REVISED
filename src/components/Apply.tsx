import { useState } from 'react';

const JobApplicationForm = () => {
  const [stage, setStage] = useState(1);

  const handleNext = () => {
    if (stage < 4) {
      setStage(stage + 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold">Applying for Senior Manager, Investor Relations</div>
          <div className="text-gray-500">Nickel Asia Corporation</div>
        </div>
        <div className="mt-4">
          <div className="flex space-x-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center space-x-2">
                <div className={`w-6 h-6 rounded-full ${step <= stage ? 'bg-teal-500 text-white' : 'bg-gray-300'}`}>{step}</div>
                <div className={`${step <= stage ? 'text-teal-500' : 'text-gray-400'}`}>Step {step}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {stage === 1 && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Personal Details</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium">First Name</label>
              <input type="text" className="mt-1 block w-full border-gray-300 rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium">Last Name</label>
              <input type="text" className="mt-1 block w-full border-gray-300 rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium">Home Location</label>
              <input type="text" className="mt-1 block w-full border-gray-300 rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium">Phone Number</label>
              <input type="tel" className="mt-1 block w-full border-gray-300 rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium">Email Address</label>
              <input type="email" className="mt-1 block w-full border-gray-300 rounded-md" />
            </div>
          </form>
        </div>
      )}

      {stage === 2 && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Resume</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Upload Resume</label>
              <input type="file" className="mt-1 block w-full" />
            </div>
          </div>
        </div>
      )}

      {stage === 3 && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Cover Letter</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Upload Cover Letter</label>
              <input type="file" className="mt-1 block w-full" />
            </div>
          </div>
        </div>
      )}

      {stage === 4 && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Review and Submit</h2>
          <div className="space-y-4">
            <p>Review your details and submit the application.</p>
          </div>
        </div>
      )}

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleNext}
          className="px-6 py-3 text-white bg-teal-500 rounded-md hover:bg-teal-600"
        >
          {stage === 4 ? 'Submit Application' : 'Continue'}
        </button>
      </div>
    </div>
  );
};

export default JobApplicationForm;
