// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5069/api', // Ví dụ
  headers: {
    'Content-Type': 'application/json',
  }
});



// Auth
export const loginUser = (data) => api.post('/auth/login', data);
export const registerUser = (data) => api.post('/auth/register', data);

// Subjects
export const getAllSubjects = () => api.get('/subjects');
export const getSubjectsByGrade = (grade) => api.get(`/subjects/by-grade/${grade}`);