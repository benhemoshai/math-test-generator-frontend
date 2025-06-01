// src/pages/PreviewPage.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const PreviewPage = ({ language, toggleLanguage }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { blobUrl } = location.state || {};

  if (!blobUrl) {
    return (
      <Layout language={language} toggleLanguage={toggleLanguage}>
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 text-center text-red-600">
          No preview available.
          <button
            onClick={() => navigate('/')}
            className="mt-4 block text-blue-600 underline"
          >
            Go back
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout language={language} toggleLanguage={toggleLanguage}>
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
        <div className="w-full max-w-5xl bg-white/90 backdrop-blur-lg shadow-xl rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
  <h1 className="text-2xl font-bold text-gray-800">📄 Exam Preview</h1>
  <a
    href={blobUrl}
    download="math-test.pdf"
    className="inline-block bg-indigo-600 text-white px-5 py-2 rounded-md text-sm hover:bg-indigo-700 transition"
  >
    Download
  </a>
</div>

<iframe
  src={blobUrl}
  title="Exam Preview"
  className="w-full h-[70vh] border rounded-lg mb-6"
/>


        </div>
      </div>
    </Layout>
  );
};

export default PreviewPage;
