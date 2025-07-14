// src/api/auth.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,          // keep if you set cookies
});

/* ---------- helpers ---------- */
export const register = (payload) =>
  API.post('/auth/register', payload).then((res) => res.data);

export const login = (payload) =>
  API.post('/auth/login', payload).then((res) => res.data);
