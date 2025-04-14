// src/App.jsx
import React, { useState, useEffect, useContext } from 'react';
import FormCard from './components/FormCard';
import Layout from './components/Layout';
import translations from './translations/translations';
import { fetchTopics, generateTest } from './services/api';
import { AuthContext } from './context/AuthContext';

const App = ({ language, toggleLanguage }) => {
  const [topics, setTopics] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [mixExams, setMixExams] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  const { isLoggedIn, user } = useContext(AuthContext);

  useEffect(() => {
    const loadTopics = async () => {
      try {
        const data = await fetchTopics();
        setTopics(data);
      } catch (err) {
        console.error('❌ Failed to load topics:', err);
        alert('Failed to fetch topics from backend.');
      } finally {
        setIsLoading(false);
      }
    };

    loadTopics();
  }, []);

  const handleGenerate = async () => {
    if (!isLoggedIn) {
      alert('Please log in to generate a test.');
      return;
    }

    setIsGenerating(true);
    try {
      const blob = await generateTest({ topics: selectedTopics, mixExams });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'math-test.pdf';
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);

      if (err.response?.status === 403) {
        alert('Your account is pending approval. Please wait for admin approval before generating tests.');
      } else if (err.response?.status === 401) {
        alert('Session expired or unauthorized. Please log in again.');
      } else {
        alert('Failed to generate PDF. Please try again later.');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCheckboxChange = (topic) => {
    setSelectedTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  if (isLoading) {
    return (
      <Layout language={language} toggleLanguage={toggleLanguage}>
        <div className="min-h-[70vh] flex justify-center items-center">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-white border-t-transparent mx-auto mb-4 sm:mb-6"></div>
            <p className="text-lg sm:text-xl font-medium">{translations[language].loading}</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout language={language} toggleLanguage={toggleLanguage}>
      <div
        className="w-full flex flex-col items-center pt-10 z-10"
        dir={language === 'he' ? 'rtl' : 'ltr'}
      >
        {/* ✅ Banner for pending users */}
        {user?.status === 'pending' && (
          <div className="w-full max-w-xl mb-4 px-4 py-3 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded text-center shadow">
            ⏳ Your account is currently <strong>pending approval</strong>.
            You’ll receive an email once approved.
          </div>
        )}

        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl px-2 sm:px-4">
          <FormCard
            language={language}
            translations={translations[language]}
            topics={topics}
            selectedTopics={selectedTopics}
            mixExams={mixExams}
            isGenerating={isGenerating}
            onTopicChange={handleCheckboxChange}
            onMixToggle={() => {
              setMixExams(!mixExams);
              setSelectedTopics([]);
            }}
            onGenerateClick={handleGenerate}
          />
        </div>
      </div>
    </Layout>
  );
};

export default App;
