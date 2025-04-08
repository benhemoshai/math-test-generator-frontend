// src/App.jsx
import React, { useState, useEffect } from 'react';
import FormCard from './components/FormCard';
import translations from './translations/translations';
import { fetchTopics, generateTest } from './services/api';
import Navbar from './components/Navbar';

const App = () => {
  const [topics, setTopics] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [mixExams, setMixExams] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [language, setLanguage] = useState('en');

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
      alert('Failed to generate PDF.');
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
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-white border-t-transparent mx-auto mb-4 sm:mb-6"></div>
          <p className="text-lg sm:text-xl text-white font-medium">{translations[language].loading}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-3 sm:p-4 relative overflow-hidden"
     
    >
      <Navbar language={language} toggleLanguage={() => setLanguage(language === 'en' ? 'he' : 'en')} />

      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 z-0">
        <div className="absolute inset-0 opacity-20">
          <div className="wave1"></div>
          <div className="wave2"></div>
          <div className="wave3"></div>
        </div>
        <div className="absolute top-10 left-10 w-16 h-16 md:w-24 md:h-24 bg-blue-300/30 rounded-xl rotate-12 backdrop-blur-sm"></div>
        <div className="absolute top-1/4 right-10 w-20 h-20 md:w-32 md:h-32 bg-purple-300/20 rounded-full backdrop-blur-sm"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 md:w-40 md:h-40 bg-indigo-300/20 rounded-lg -rotate-12 backdrop-blur-sm"></div>
        <div className="absolute top-2/3 right-1/3 w-12 h-12 md:w-20 md:h-20 bg-blue-300/30 rounded-xl rotate-45 backdrop-blur-sm"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 md:w-28 md:h-28 bg-purple-300/20 rounded-full backdrop-blur-sm"></div>
      </div>

      <style jsx>{`
        @keyframes wave1 {
          0% { transform: translateX(0) translateZ(0) scaleY(1); }
          50% { transform: translateX(-25%) translateZ(0) scaleY(0.8); }
          100% { transform: translateX(-50%) translateZ(0) scaleY(1); }
        }
        @keyframes wave2 {
          0% { transform: translateX(0) translateZ(0) scaleY(0.9); }
          50% { transform: translateX(-25%) translateZ(0) scaleY(1.1); }
          100% { transform: translateX(-50%) translateZ(0) scaleY(0.9); }
        }
        @keyframes wave3 {
          0% { transform: translateX(0) translateZ(0) scaleY(1.1); }
          50% { transform: translateX(-25%) translateZ(0) scaleY(0.8); }
          100% { transform: translateX(-50%) translateZ(0) scaleY(1.1); }
        }
        .wave1, .wave2, .wave3 {
          position: absolute;
          width: 200%;
          height: 200%;
          top: -50%;
          left: 0;
          opacity: 0.3;
          background: linear-gradient(270deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1));
          border-radius: 50%;
        }
        .wave1 {
          animation: wave1 12s linear infinite;
        }
        .wave2 {
          animation: wave2 10s linear infinite;
          top: -20%;
        }
        .wave3 {
          animation: wave3 15s linear infinite;
          top: -35%;
        }
      `}</style>

      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl px-2 sm:px-4 z-10 pt-24"
       dir={language === 'he' ? 'rtl' : 'ltr'}>
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
  );
};

export default App;