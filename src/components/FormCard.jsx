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
  examNumber,
  setExamNumber
}) => {
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [selectedExam, setSelectedExam] = useState(null);

  const selectedExamData = unitTopics
    .find((u) => u.unit === selectedUnit)?.exams
    .find((e) => e.number === selectedExam);

  return (
    <div
      className={`relative w-11/12 md:w-3/4 max-w-5xl mx-auto p-6 lg:p-8 rounded-3xl shadow-2xl border border-blue-200 bg-white/70 backdrop-blur-lg ring-1 ring-blue-300/20 ${
        language === 'he' ? 'text-right' : ''
      }`}
    >
      {/* Header Section */}
      <div className="flex flex-col items-center text-center mb-8">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-blue-800">
          {translations.title}
        </h1>
        <span className="mt-2 h-1 w-1/2 max-w-xs bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></span>
        <p className="text-base lg:text-lg text-gray-600 mt-4">
          {mixExams ? translations.subtitle_mix : translations.subtitle_custom}
        </p>
      </div>

      {/* Controls Section */}
      <div className="space-y-6 mb-8">
        {/* Unit Selection */}
        <div className="text-center">
          <label className="block text-lg font-medium text-gray-700 mb-3">{translations.selectUnit}</label>
          <div className="flex justify-center flex-wrap gap-3">
            {unitTopics.map((unitObj) => (
              <button
                key={unitObj.unit}
                onClick={() => {
                  setSelectedUnit(unitObj.unit);
                  setSelectedExam(null);
                  onResetTopics();
                  setExamNumber(null);
                }}
                className={`px-6 py-3 rounded-full font-semibold border transition-all duration-200 shadow-sm hover:shadow-lg ${
                  selectedUnit === unitObj.unit
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white scale-105'
                    : 'bg-white text-gray-700 hover:bg-blue-50'
                }`}
              >
                {unitObj.unit} {language === 'he' ? 'יח"ל' : 'Units'}
              </button>
            ))}
          </div>
        </div>

        {/* Exam Selection */}
        <div className="text-center">
          <label className="block text-lg font-medium text-gray-700 mb-3">{translations.selectExam}</label>
          <div className="relative max-w-xs mx-auto">
            <select
              className={`w-full appearance-none border text-base rounded-xl block px-4 py-3 pr-10 shadow-sm transition-all ${
                selectedUnit
                  ? 'bg-white border-gray-300 text-gray-800 focus:ring-purple-500 focus:border-purple-500'
                  : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
              }`}
              onChange={(e) => {
                const selected = parseInt(e.target.value);
                setSelectedExam(selected);
                setExamNumber(selected.toString());
                onResetTopics();
              }}
              value={selectedExam || ''}
              disabled={!selectedUnit}
            >
              <option value="" disabled>
                {selectedUnit ? translations.chooseExam : 'Select a unit first'}
              </option>
              {selectedUnit &&
                unitTopics.find((u) => u.unit === selectedUnit)?.exams.map((exam) => (
                  <option key={exam.number} value={exam.number}>
                    {exam.number}
                  </option>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Mix Exams Toggle */}
      <div className="flex justify-center mb-8">
        <div
          onClick={() => {
            if (!examNumber) {
              alert(language === 'he'
                ? 'אנא בחר מבחן לפני הפעלת מצב שאלות מעורבות.'
                : 'Please select an exam before using Mix Exams mode.');
              return;
            }
            onMixToggle();
            onResetTopics();
          }}
          className="flex items-center bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className={`w-12 h-6 rounded-full transition-colors ${mixExams ? 'bg-purple-600' : 'bg-gray-300'}`}></div>
              <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${mixExams ? 'translate-x-6' : ''}`}></div>
            </div>
            <span className="text-base font-medium text-gray-700">{translations.mixLabel}</span>
          </div>
        </div>
      </div>

      {/* Topics */}
      {!mixExams && selectedExamData?.chapters && (
        <div className="space-y-8 mb-8">
          {selectedExamData.chapters.map((chapter, chapterIndex) => (
            <div key={chapterIndex} className="bg-gray-50/50 rounded-2xl p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-blue-700 mb-6 text-center border-b pb-3">
                {language === 'he'
                  ? `פרק ${chapterIndex + 1} - ${chapter.name.he}`
                  : `Chapter ${chapterIndex + 1} - ${chapter.name.en}`}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center">
                {chapter.topics.map((topic) => (
                  <label
  key={topic.en}
  className={`flex items-center border p-4 rounded-xl transition-transform duration-200 transform hover:scale-[1.02] hover:shadow-lg w-full max-w-sm ${
    language === 'he' ? 'text-right' : 'text-left'
  } ${
    selectedTopics.includes(topic.en)
      ? 'bg-blue-100 border-blue-400 shadow-md'
      : 'bg-white border-gray-200 hover:border-blue-200 hover:bg-blue-50'
  }`}
>
  <input
    type="checkbox"
    checked={selectedTopics.includes(topic.en)}
    onChange={() => onTopicChange(topic.en)}
    className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500 flex-shrink-0"
  />
  <span className={`text-gray-800 text-sm font-medium leading-tight ${
    language === 'he' ? 'mr-2' : 'ml-2'
  }`}>
    {language === 'he' ? topic.he : topic.en}
  </span>
</label>

                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Generate Button */}
      <div className="flex justify-center">
        <button
          onClick={onGenerateClick}
          disabled={isGenerating || (!mixExams && selectedTopics.length === 0)}
          className={`px-12 py-4 rounded-2xl font-bold text-lg transition transform hover:-translate-y-1 hover:scale-[1.02] duration-300 ${
            isGenerating || (!mixExams && selectedTopics.length === 0)
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-purple-300'
          }`}
        >
          {isGenerating ? (
            <div className="flex items-center justify-center gap-3">
              <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
    </div>
  );
};

export default FormCard;
