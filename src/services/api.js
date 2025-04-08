// src/services/api.js
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL;

export async function fetchTopics() {
  const res = await axios.get(`${API_BASE}/topics`);
  return res.data;
}

export async function generateTest({ topics, mixExams }) {
  const res = await axios.post(
    `${API_BASE}/generate-test`,
    { topics, mixExams },
    { responseType: 'blob' } // ✅ this ensures PDF blob is returned correctly
  );
  return res.data;
}
