// src/App.jsx
import React, { useState, useEffect } from 'react';
import FormCard from './components/FormCard';
import translations from './translations/translations';

const App = () => {
  const [topics, setTopics] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [mixExams, setMixExams] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await fetch('http://localhost:5000/topics');
        const data = await res.json();
        setTopics(data);
      } catch (err) {
        console.error('❌ Failed to load topics:', err);
        alert('Failed to fetch topics from backend.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchTopics();
  }, []);

  const handleCheckboxChange = (topic) => {
    setSelectedTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('http://localhost:5000/generate-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topics: selectedTopics, mixExams }),
      });

      if (!res.ok) throw new Error('Failed to generate test');

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'math-test.pdf';
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert('Failed to generate PDF.');
    } finally {
      setIsGenerating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-purple-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 border-solid mx-auto mb-4"></div>
          <p className="text-lg text-blue-600 font-medium">{translations[language].loading}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex flex-col items-center justify-center p-4"
      dir={language === 'he' ? 'rtl' : 'ltr'}
    >
      <button
        className="mb-4 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
        onClick={() => setLanguage(language === 'en' ? 'he' : 'en')}
      >
        {language === 'en' ? 'עברית' : 'English'}
      </button>

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
  );
};

export default App;
