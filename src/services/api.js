import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL;

export async function fetchTopics() {
  const res = await axios.get(`${API_BASE}/topics`);
  return res.data;
}

export async function generateTest({ topics, mixExams, examNumber }) {
  const token = localStorage.getItem('token');

  const res = await axios.post(
    `${API_BASE}/generate-test`,
    { topics, mixExams, examNumber }, // ✅ include examNumber in payload
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: 'blob', // for PDF
    }
  );

  return res.data;
}
