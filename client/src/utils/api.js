import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/jobs',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const fetchJobs = (params = {}) => API.get('/', { params });
export const createJob = (data) => API.post('/', data);
export const updateJob = (id, data) => API.put(`/${id}`, data);
export const deleteJob = (id) => API.delete(`/${id}`);
