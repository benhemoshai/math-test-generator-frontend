import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { login as loginService } from '../services/authService';
import Layout from '../components/Layout';

const LoginForm = ({ language, toggleLanguage }) => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    const formatted = name === 'email' ? value.toLowerCase() : value;
    setFormData((prev) => ({ ...prev, [name]: formatted }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginService(formData.email, formData.password);
      login(data.token, data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.');
    }
  };

  return (
    <Layout language={language} toggleLanguage={toggleLanguage}>
      {/* Center the login card within the layout */}
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center ">
        <div className="w-full max-w-md bg-white shadow-lg rounded-xl px-8 py-10">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 4v16m8-8H4" />
              </svg>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-center text-gray-900 mb-2">Welcome back</h2>
          <p className="text-gray-500 text-center mb-6">Sign in to access your memories and notes</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="flex justify-between items-center text-sm font-medium text-gray-700 mb-1">
                <span>Password</span>
                <a href="#" className="text-blue-600 hover:underline text-sm">Forgot password?</a>
              </label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition-all"
            >
              Sign in
            </button>
          </form>

          {error && (
            <p className="text-red-600 text-sm text-center mt-4">{error}</p>
          )}

          <p className="text-center text-sm text-gray-500 mt-6">
            Don’t have an account?{' '}
            <a href="/register" className="text-blue-600 hover:underline">
              Create one now
            </a>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default LoginForm;
