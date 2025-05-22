import React, { useState } from 'react';
import unitTopics from '../utils/unitTopics';

const FormCard = ({
  language,
  translations,
  mixExams,
  isGenerating,
  selectedTopics,
  onTopicChange,
  onMixToggle,
  onGenerateClick,
  onResetTopics,
  setExamNumber // ✅ new prop
}) => {
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [selectedExam, setSelectedExam] = useState(null);

  const selectedExamData = unitTopics
    .find((u) => u.unit === selectedUnit)?.exams
    .find((e) => e.number === selectedExam);

  return (
    <div className={`bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-4 sm:p-6 md:p-8 w-full max-w-xl mx-auto ${language === 'he' ? 'text-right' : ''}`}>
      <div className="mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {translations.title}
        </h1>
        <p className="text-sm sm:text-base text-gray-600 text-center">
          {mixExams ? translations.subtitle_mix : translations.subtitle_custom}
        </p>
      </div>

      {!mixExams && (
        <>
          {/* Unit Selection */}
          <div className="mb-6 text-center">
            <label className="block text-lg font-medium text-gray-700 mb-2">{translations.selectUnit}</label>
            <div className="flex justify-center gap-4">
              {unitTopics.map((unitObj) => (
                <button
                  key={unitObj.unit}
                  onClick={() => {
                    setSelectedUnit(unitObj.unit);
                    setSelectedExam(null);
                    onResetTopics();
                    setExamNumber(null); // clear exam number when changing unit
                  }}
                  className={`px-4 py-2 rounded-lg font-semibold border transition-all duration-200 ${
                    selectedUnit === unitObj.unit
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {unitObj.unit} {language === 'he' ? 'יח"ל' : 'Units'}
                </button>
              ))}
            </div>
          </div>

          {/* Exam Selection */}
          {selectedUnit && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">{translations.selectExam || 'Choose Exam'}</label>
              <div className="relative">
                <select
                  className="w-full appearance-none bg-white border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block px-4 py-2 pr-10 shadow-sm transition-all"
                  onChange={(e) => {
                    const selected = parseInt(e.target.value);
                    setSelectedExam(selected);
                    setExamNumber(selected.toString()); // ✅ direct examNumber set
                    onResetTopics();
                  }}
                  value={selectedExam || ''}
                >
                  <option value="" disabled>{translations.chooseExam || 'Select...'}</option>
                  {unitTopics.find((u) => u.unit === selectedUnit)?.exams.map((exam) => (
                    <option key={exam.number} value={exam.number}>{exam.number}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          )}

          {/* Topic Selection */}
          {selectedExamData?.chapters && (
            <div className="space-y-6 mb-6">
              {selectedExamData.chapters.map((chapter, chapterIndex) => (
                <div key={chapterIndex}>
                  <h3 className="text-lg font-semibold text-blue-700 mb-3 border-b pb-1">
                    {language === 'he'
                      ? `פרק ${chapterIndex + 1} - ${chapter.name.he}`
                      : `Chapter ${chapterIndex + 1} - ${chapter.name.en}`}
                  </h3>
                  <div className="space-y-3">
                    {chapter.topics.map((topic) => (
                      <label
                        key={topic.en}
                        className={`flex items-center space-x-3 bg-white border border-gray-200 p-3 rounded-lg ${
                          selectedTopics.includes(topic.en)
                            ? 'bg-blue-100 border-blue-300'
                            : 'hover:bg-blue-50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedTopics.includes(topic.en)}
                          onChange={() => onTopicChange(topic.en)}
                          className="form-checkbox h-5 w-5 text-blue-600"
                        />
                        <span className="text-gray-800">
                          {language === 'he' ? topic.he : topic.en}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Mix Toggle */}
      <div onClick={onMixToggle} className="flex items-center mb-4 sm:mb-6 bg-gray-50 p-3 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
        <div className="flex items-center gap-2 w-full">
          <div className="relative">
            <div className={`w-10 h-5 rounded-full transition-colors ${mixExams ? 'bg-purple-600' : 'bg-gray-300'}`}></div>
            <div className={`absolute top-0.5 left-0.5 bg-white w-4 h-4 rounded-full transition-transform ${mixExams ? 'translate-x-5' : ''}`}></div>
          </div>
          <span className="text-sm font-medium text-gray-700">{translations.mixLabel}</span>
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={onGenerateClick}
        disabled={isGenerating || (!mixExams && selectedTopics.length === 0)}
        className={`w-full py-3 rounded-xl font-bold text-base transition-all duration-300 ${
          isGenerating || (!mixExams && selectedTopics.length === 0)
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-blue-200/50 transform hover:-translate-y-1'
        }`}
      >
        {isGenerating ? (
          <div className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
