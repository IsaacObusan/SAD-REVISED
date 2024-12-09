import React, { useState } from 'react';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Required field');
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Simulate an API call to send a reset link
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      alert('Password reset link sent to your email');
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-bold text-center">Forgot password</h2>
        <p className="mb-6 text-center text-gray-600">
          Enter your email address below and we will send you a link to reset your password.
        </p>

        {success ? (
          <p className="mb-4 text-center text-green-600">Email sent successfully!</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none ${
                  error ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-teal-500 unded-md hover:bg-teal-400"
            >
              Next
            </button>
          </form>
        )}

        <div className="mt-6 text-center text-gray-500">
          <p>
            If you need additional help, please contact{' '}
            <a href="/customer-service" className="text-blue-500 hover:underline">
              customer service
            </a>
            .
          </p>
          <p className="mt-2">
            Trying to sign in as an employer or recruiter?{' '}
            <a href="/advertiser-help" className="text-blue-500 hover:underline">
              Advertiser center help
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
