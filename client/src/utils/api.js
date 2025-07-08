import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/jobs',
});

export const fetchJobs = (params = {}) => API.get('/', { params });
export const createJob = (data) => API.post('/', data);
export const updateJob = (id, data) => API.put(`/${id}`, data);
export const deleteJob = (id) => API.delete(`/${id}`);
