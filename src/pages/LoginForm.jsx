import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { login as loginService } from '../services/authService';
import Layout from '../components/Layout';
import { useLanguage } from '../context/LanguageContext';
import translations from '../translations/translations';
import { Link } from 'react-router-dom';


const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
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
      setError(err.response?.data?.message || t.login_error);
    }
  };

  return (
    <Layout>
      <div
        className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4"
        dir={language === 'he' ? 'rtl' : 'ltr'}
      >
        <div className="w-full max-w-md bg-white/90 backdrop-blur-lg shadow-xl rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-4">
            {t.login_welcome}
          </h2>
          <p className="text-center text-gray-500 mb-6">{t.login_subtitle}</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.login_email}
              </label>
              <input
                name="email"
                type="email"
                placeholder={t.login_placeholder_email}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.login_password}
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute inset-y-0 ${
                    language === 'he' ? 'left-3' : 'right-3'
                  } flex items-center text-sm text-gray-500`}
                >
                  {showPassword ? t.login_toggle_hide : t.login_toggle_show}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              {t.login_button}
            </button>

            {error && (
              <p className="text-red-600 text-sm text-center mt-2">{error}</p>
            )}
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            {t.login_no_account}{' '}
            <Link to="/register" className="text-blue-600 hover:underline">
  {translations[language].login_signup}
</Link>

          </p>
        </div>
      </div>
    </Layout>
  );
};

export default LoginForm;
