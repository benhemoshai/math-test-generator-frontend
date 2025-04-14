import React, { useContext, useState } from 'react';
import Layout from './Layout';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { login as loginService, register as registerService } from '../services/authService';

const AuthForm = ({ mode, language, toggleLanguage }) => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const isRegister = mode === 'register';

  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = isRegister
        ? await registerService(formData.name, formData.email, formData.password)
        : await loginService(formData.email, formData.password);
  
      if (isRegister) {
        // ✅ Automatically log in the user after registration
        login(data.token, data.user);
        alert('Registration successful! Please wait for approval.');
        navigate('/');
      } else {
        login(data.token, data.user);
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed.');
    }
  };
  

  return (
    <Layout language={language} toggleLanguage={toggleLanguage}>
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 z-10">
        <h2 className="text-xl font-bold mb-4 text-center">
          {isRegister ? 'Register' : 'Login'}
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <input
              name="name"
              placeholder="Name"
              className="w-full border px-3 py-2 rounded"
              onChange={handleChange}
              required
            />
          )}
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full border px-3 py-2 rounded"
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full border px-3 py-2 rounded"
            onChange={handleChange}
            required
          />
          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
            {isRegister ? 'Register' : 'Login'}
          </button>
        </form>

        {/* Error message */}
        {error && (
          <div className="text-red-600 text-sm text-center mt-4">{error}</div>
        )}
      </div>
    </Layout>
  );
};

export default AuthForm;
