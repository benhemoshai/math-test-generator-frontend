import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { register as registerService } from '../services/authService';
import Layout from '../components/Layout';
import translations from '../translations/translations';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';


const RegisterForm = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formatted = value;
    if (name === 'email') formatted = value.toLowerCase();
    if (name === 'name') formatted = value.charAt(0).toUpperCase() + value.slice(1);
    setFormData((prev) => ({ ...prev, [name]: formatted }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError(language === 'he' ? 'הסיסמאות אינן תואמות.' : 'Passwords do not match.');
      return;
    }
    try {
      const data = await registerService(formData.name, formData.email, formData.password);
      login(data.token, data.user);
      alert(t.register_success);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || t.register_error);
    }
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4" dir={language === 'he' ? 'rtl' : 'ltr'}>
        <div className="w-full max-w-md bg-white/90 backdrop-blur-lg shadow-xl rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-4">{t.register_title}</h2>
          <p className="text-center text-gray-500 mb-6">{t.register_subtitle}</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.register_name}</label>
              <input
                name="name"
                placeholder={t.register_placeholder_name}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.register_email}</label>
              <input
                name="email"
                type="email"
                placeholder={t.register_placeholder_email}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.register_password}</label>
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
                  className={`absolute inset-y-0 ${language === 'he' ? 'left-3' : 'right-3'} flex items-center text-sm text-gray-500`}
                >
                  {showPassword ? t.toggle_hide : t.toggle_show}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.register_confirm}</label>
              <input
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              {t.register_button}
            </button>

            {error && (
              <p className="text-red-600 text-sm text-center mt-2">{error}</p>
            )}
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            {t.register_have_account}{' '}
            <Link to="/login" className="text-blue-600 hover:underline">
  {translations[language].register_signin}
</Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterForm;
