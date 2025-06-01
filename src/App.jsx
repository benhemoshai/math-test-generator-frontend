import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import FormCard from './components/FormCard';
import Layout from './components/Layout';
import translations from './translations/translations';
import { generateTest } from './services/api';
import { AuthContext } from './context/AuthContext';


const App = ({ language, toggleLanguage }) => {
  const [topics, setTopics] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [mixExams, setMixExams] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [examNumber, setExamNumber] = useState(null);
  const { isLoggedIn, user } = useContext(AuthContext);
  const [userStatus, setUserStatus] = useState(user?.status);
  const navigate = useNavigate();

  useEffect(() => {
    setUserStatus(user?.status);
  }, [user]);

  const handleGenerate = async () => {
  if (!isLoggedIn) {
    alert('Please log in to generate a test.');
    return;
  }

  setIsGenerating(true);
  try {
    const blob = await generateTest({
      topics: selectedTopics,
      mixExams,
      examNumber
    });
    const url = URL.createObjectURL(blob);

    // Navigate to preview page with the blob URL
    navigate('/preview', { state: { blobUrl: url } });

  } catch (err) {
    console.error(err);
    alert('Failed to generate PDF. Please try again later.');
  } finally {
    setIsGenerating(false);
  }
};


  const resetSelectedTopics = () => {
    setSelectedTopics([]);
  };

  const handleCheckboxChange = (topic) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
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
      <div className="w-full flex flex-col items-center z-10" dir={language === 'he' ? 'rtl' : 'ltr'}>
        {userStatus === 'pending' && (
          <div className="w-full max-w-4xl mb-6 px-4 py-3 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded-lg text-center shadow-md">
            ⏳ Your account is currently <strong>pending approval</strong>.
            You'll receive an email once approved.
          </div>
        )}
        
        {/* Remove the constraining container and let FormCard handle its own width */}
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
          onResetTopics={resetSelectedTopics}
          setExamNumber={setExamNumber}
          examNumber={examNumber}
        />
      </div>
    </Layout>
  );
};

export default App;