import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import AuthForm from './components/AuthForm.jsx';
import AuthProvider from './context/AuthProvider';
import './index.css';

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
            element={<AuthForm mode="login" language={language} toggleLanguage={toggleLanguage} />}
          />
          <Route
            path="/register"
            element={<AuthForm mode="register" language={language} toggleLanguage={toggleLanguage} />}
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);
