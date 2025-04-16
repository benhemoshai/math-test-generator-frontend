// src/services/authService.js
import axios from 'axios';

const API = import.meta.env.VITE_API_URL 

export const register = async (name, email, password) => {
  const res = await axios.post(`${API}/auth/register`, { name, email, password });
  return res.data;
};

export const login = async (email, password) => {
  const res = await axios.post(`${API}/auth/login`, { email, password });
  return res.data;
};

export const getCurrentUser = async (token) => {
  const res = await axios.get(`${API}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const activateUser = async (userId, token) => {
  const res = await axios.post(`${API}/auth/activate/${userId}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
