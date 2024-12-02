import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logoo.png'; // Import the logo
import axios from 'axios';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State for handling error messages
  const navigate = useNavigate();
  const serverUrl = import.meta.env.VITE_APP_SERVERHOST;

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email and password
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      // Send login request
      const response = await axios.post(serverUrl + "login", { email, password });

      if (response.data.role === 'admin') {
        navigate('/admin'); // Navigate to Admin page
      } else if (response.data.role === 'applicant') {
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("accountName", response.data.name);
        navigate('/employee-landing'); // Navigate to Employee Landing page
      } else if (response.data.role === 'employer') {
        navigate('/employer-landing'); // Navigate to Employer Landing page
      } else {
        setError('Invalid Credentials');
      }
    } catch (e: any) {
      // Handle Axios error
      console.error(e);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-lg w-[30rem]">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="Logo" className="h-20" />
        </div>
        <h2 className="mb-6 text-2xl font-semibold text-center">Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 text-white transition duration-200 bg-teal-500 rounded-md hover:bg-green-600"
          >
            Login
          </button>

          {/* Error message at the bottom */}
          {error && <p className="mt-4 text-center text-red-500">{error}</p>}
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <span
              onClick={() => navigate('/sign-up')}
              className="text-teal-500 cursor-pointer hover:underline"
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
