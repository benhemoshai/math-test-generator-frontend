import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { register as registerService } from '../services/authService';
import Layout from '../components/Layout';

const RegisterForm = ({ language, toggleLanguage }) => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formatted = value;
    if (name === 'email') {
      formatted = value.toLowerCase();
    }
    if (name === 'name') {
      formatted = value.charAt(0).toUpperCase() + value.slice(1);
    }

    setFormData((prev) => ({ ...prev, [name]: formatted }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await registerService(formData.name, formData.email, formData.password);
      login(data.token, data.user);
      alert('Registration successful! Please wait for approval.');
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <Layout language={language} toggleLanguage={toggleLanguage}>
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="w-full max-w-md bg-white shadow-lg rounded-xl px-8 py-10">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M16 21v-2a4 4 0 00-8 0v2m8-10a4 4 0 10-8 0 4 4 0 008 0z" />
              </svg>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-center text-gray-900 mb-2">Create your account</h2>
          <p className="text-gray-500 text-center mb-6">Sign up to get started</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                name="name"
                placeholder="John"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={handleChange}
                required
              />
            </div>

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
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition-all"
            >
              Sign up
            </button>
          </form>

          {error && (
            <p className="text-red-600 text-sm text-center mt-4">{error}</p>
          )}

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <a href="/login" className="text-blue-600 hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterForm;
