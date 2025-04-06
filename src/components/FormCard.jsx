// src/components/FormCard.jsx
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
      className={`bg-white shadow-2xl rounded-2xl p-8 max-w-xl w-full ${
        language === 'he' ? 'text-right' : ''
      }`}
    >
      <h1 className="text-3xl font-bold mb-2 text-center text-blue-600">
        {translations.title}
      </h1>
      <p className="text-gray-600 text-center mb-6">
        {mixExams ? translations.subtitle_mix : translations.subtitle_custom}
      </p>

      {!mixExams && (
        <div className="mb-6 space-y-4">
          {/* Chapter 1 */}
          <div>
            <h2 className="text-lg font-semibold text-blue-700 mb-2">
              {translations.chapter1}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {topics.slice(0, 3).map((topic) => (
                <label
                  key={topic}
                  className="flex items-center space-x-2 bg-gray-100 rounded px-3 py-2 cursor-pointer hover:bg-blue-50"
                >
                  <input
                    type="checkbox"
                    className="form-checkbox accent-blue-600"
                    checked={selectedTopics.includes(topic)}
                    onChange={() => onTopicChange(topic)}
                  />
                 <span className="text-sm text-gray-700">
  {language === 'he' ? topicTranslations[topic] || topic : topic}
</span>

                </label>
              ))}
            </div>
          </div>

          {/* Chapter 2 */}
          <div>
            <h2 className="text-lg font-semibold text-blue-700 mb-2">
              {translations.chapter2}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {topics.slice(3, 5).map((topic) => (
                <label
                  key={topic}
                  className="flex items-center space-x-2 bg-gray-100 rounded px-3 py-2 cursor-pointer hover:bg-blue-50"
                >
                  <input
                    type="checkbox"
                    className="form-checkbox accent-blue-600"
                    checked={selectedTopics.includes(topic)}
                    onChange={() => onTopicChange(topic)}
                  />
                  <span className="text-sm text-gray-700">
  {language === 'he' ? topicTranslations[topic] || topic : topic}
</span>

                </label>
              ))}
            </div>
          </div>

          {/* Chapter 3 */}
          <div>
            <h2 className="text-lg font-semibold text-blue-700 mb-2">
              {translations.chapter3}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {topics.slice(5, 8).map((topic) => (
                <label
                  key={topic}
                  className="flex items-center space-x-2 bg-gray-100 rounded px-3 py-2 cursor-pointer hover:bg-blue-50"
                >
                  <input
                    type="checkbox"
                    className="form-checkbox accent-blue-600"
                    checked={selectedTopics.includes(topic)}
                    onChange={() => onTopicChange(topic)}
                  />
                  <span className="text-sm text-gray-700">
  {language === 'he' ? topicTranslations[topic] || topic : topic}
</span>

                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            className="accent-purple-600"
            checked={mixExams}
            onChange={onMixToggle}
          />
          <span className="text-sm text-gray-700">{translations.mixLabel}</span>
        </label>
      </div>

      <button
        onClick={onGenerateClick}
        disabled={isGenerating || (!mixExams && selectedTopics.length === 0)}
        className={`w-full text-white font-semibold py-3 rounded-lg transition ${
          isGenerating || (!mixExams && selectedTopics.length === 0)
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isGenerating ? translations.generating : translations.generate}
      </button>
    </div>
  );
};

export default FormCard;
