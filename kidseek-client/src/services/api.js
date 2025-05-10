// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5069/api/auth', // Ví dụ
  headers: {
    'Content-Type': 'application/json',
  }
});

export const getCourses = () => api.get('/courses');
export const loginUser = (data) => api.post('/login', data);
export const registerUser = (data) => api.post('/register', data);
