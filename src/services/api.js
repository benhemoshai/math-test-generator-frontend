const API_BASE = import.meta.env.VITE_API_URL || 'https://math-test-generator-back.onrender.com';

export async function fetchTopics() {
  const res = await fetch(`${API_BASE}/topics`);
  if (!res.ok) throw new Error('Failed to fetch topics');
  return res.json();
}

export async function generateTest({ topics, mixExams }) {
  const res = await fetch(`${API_BASE}/generate-test`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ topics, mixExams }),
  });

  if (!res.ok) throw new Error('Failed to generate test');
  return res.blob();
}
