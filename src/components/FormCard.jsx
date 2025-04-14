import React from 'react';
import topicTranslations from '../translations/topicTranslations';

const FormCard = ({
  language,
  translations,
  topics,
  selectedTopics,
  mixExams,
  isGenerating,
  onTopicChange,
  onMixToggle,
  onGenerateClick,
}) => {
  return (
    <div
      className={`bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-4 sm:p-6 md:p-8 w-full max-w-xl mx-auto ${
        language === 'he' ? 'text-right' : ''
      }`}
    >
      <div className="mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {translations.title}
        </h1>
        <p className="text-sm sm:text-base text-gray-600 text-center">
          {mixExams ? translations.subtitle_mix : translations.subtitle_custom}
        </p>
      </div>

      {!mixExams && (
        <div className="mb-4 sm:mb-6 space-y-4">
          {/* Chapter 1 */}
          <div className="bg-blue-50 p-3 sm:p-4 rounded-xl border border-blue-100">
            <h2 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-blue-700 flex items-center">
              {translations.chapter1}
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:gap-4">
              {topics.slice(0, 3).map((topic) => (
                <label
                  key={topic}
                  className={`flex items-center space-x-3 sm:space-x-2 rounded-lg px-3 sm:px-3 py-3 cursor-pointer transition-all duration-200 ${
                    selectedTopics.includes(topic)
                      ? 'bg-blue-200/70 border border-blue-300'
                      : 'bg-white border border-gray-200 hover:bg-blue-50'
                  }`}
                >
                  <input
                    type="checkbox"
                    className="form-checkbox h-6 w-6 sm:h-5 sm:w-5 accent-blue-600"
                    checked={selectedTopics.includes(topic)}
                    onChange={() => onTopicChange(topic)}
                  />
                  <span className={`text-sm sm:text-base ${selectedTopics.includes(topic) ? 'font-medium text-blue-700' : 'text-gray-700'}`}>
                    {language === 'he' ? topicTranslations[topic] || topic : topic}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Chapter 2 */}
          <div className="bg-purple-50 p-3 sm:p-4 rounded-xl border border-purple-100">
            <h2 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-purple-700 flex items-center">
              {translations.chapter2}
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:gap-4">
              {topics.slice(3, 5).map((topic) => (
                <label
                  key={topic}
                  className={`flex items-center space-x-3 sm:space-x-2 rounded-lg px-3 sm:px-3 py-3 cursor-pointer transition-all duration-200 ${
                    selectedTopics.includes(topic)
                      ? 'bg-purple-200/70 border border-purple-300'
                      : 'bg-white border border-gray-200 hover:bg-purple-50'
                  }`}
                >
                  <input
                    type="checkbox"
                    className="form-checkbox h-6 w-6 sm:h-5 sm:w-5 accent-purple-600"
                    checked={selectedTopics.includes(topic)}
                    onChange={() => onTopicChange(topic)}
                  />
                  <span className={`text-sm sm:text-base ${selectedTopics.includes(topic) ? 'font-medium text-purple-700' : 'text-gray-700'}`}>
                    {language === 'he' ? topicTranslations[topic] || topic : topic}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Chapter 3 */}
          <div className="bg-indigo-50 p-3 sm:p-4 rounded-xl border border-indigo-100">
            <h2 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-indigo-700 flex items-center">
              {translations.chapter3}
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:gap-4">
              {topics.slice(5, 8).map((topic) => (
                <label
                  key={topic}
                  className={`flex items-center space-x-3 sm:space-x-2 rounded-lg px-3 sm:px-3 py-3 cursor-pointer transition-all duration-200 ${
                    selectedTopics.includes(topic)
                      ? 'bg-indigo-200/70 border border-indigo-300'
                      : 'bg-white border border-gray-200 hover:bg-indigo-50'
                  }`}
                >
                  <input
                    type="checkbox"
                    className="form-checkbox h-6 w-6 sm:h-5 sm:w-5 accent-indigo-600"
                    checked={selectedTopics.includes(topic)}
                    onChange={() => onTopicChange(topic)}
                  />
                  <span className={`text-sm sm:text-base ${selectedTopics.includes(topic) ? 'font-medium text-indigo-700' : 'text-gray-700'}`}>
                    {language === 'he' ? topicTranslations[topic] || topic : topic}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mix Exams Toggle */}
      <div 
        className="flex items-center mb-4 sm:mb-6 bg-gray-50 p-3 sm:p-3 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
        onClick={onMixToggle}
      >
        <div className="flex items-center gap-2 w-full">
          <div className="relative">
            <div className={`w-10 sm:w-10 h-5 sm:h-5 rounded-full transition-colors ${mixExams ? 'bg-purple-600' : 'bg-gray-300'}`}></div>
            <div className={`absolute top-0.5 left-0.5 bg-white w-4 h-4 sm:w-4 sm:h-4 rounded-full transition-transform ${mixExams ? 'translate-x-5 sm:translate-x-5' : ''}`}></div>
          </div>
          <span className="text-sm sm:text-base font-medium text-gray-700">{translations.mixLabel}</span>
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={onGenerateClick}
        disabled={isGenerating || (!mixExams && selectedTopics.length === 0)}
        className={`w-full py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 ${
          isGenerating || (!mixExams && selectedTopics.length === 0)
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-blue-200/50 transform hover:-translate-y-1'
        }`}
      >
        {isGenerating ? (
          <div className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5 sm:h-6 sm:w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {translations.generating}
          </div>
        ) : (
          translations.generate
        )}
      </button>
    </div>
  );
};

export default FormCard;
