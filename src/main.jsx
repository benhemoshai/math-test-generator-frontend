import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import AuthProvider from './context/AuthProvider';
import ActivateAccount from './pages/ActivateAccount.jsx';
import './index.css';
import LoginForm from './pages/LoginForm.jsx';
import RegisterForm from './pages/RegisterForm.jsx';

const Root = () => {
  const [language, setLanguage] = useState('en');
  const toggleLanguage = () => setLanguage(prev => (prev === 'en' ? 'he' : 'en'));

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* ✅ Main app is now public */}
          <Route
            path="/"
            element={<App language={language} toggleLanguage={toggleLanguage} />}
          />
          <Route
            path="/login"
            element={<LoginForm language={language} toggleLanguage={toggleLanguage} />}
          />
          <Route
            path="/register"
            element={<RegisterForm language={language} toggleLanguage={toggleLanguage} />}
          />
          <Route path="/activate/:userId" element={<ActivateAccount />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);
