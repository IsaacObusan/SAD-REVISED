import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logoo.png'; // Import the logo

const Login: React.FC = () => {
  const [email, setEmail] = useState(''); // Changed 'username' to 'email'
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState(''); // State for handling error messages
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    // Simple email validation regex
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!role) {
      setError('Please select a role (Employee or Employer)');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    // Simulate login verification
    if (email === 'employee@example.com' && password === 'employee123' && role === 'employee') {
      navigate('/employee-landing');
    } else if (email === 'employer@example.com' && password === 'employer123' && role === 'employer') {
      navigate('/employer-landing');
    } else {
      setError('Invalid email or password');
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

        {/* Error message */}
        {error && <p className="mb-4 text-center text-red-500">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
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
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Role selection */}
          <div className="mt-4">
            <p className="mb-2 text-sm font-medium text-gray-700">Select your role:</p>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="employee"
                  checked={role === 'employee'}
                  onChange={(e) => setRole(e.target.value)}
                  className="mr-2"
                />
                Employee
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="employer"
                  checked={role === 'employer'}
                  onChange={(e) => setRole(e.target.value)}
                  className="mr-2"
                />
                Employer
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 text-white transition duration-200 bg-teal-500 rounded-md hover:bg-green-600"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account? 
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
