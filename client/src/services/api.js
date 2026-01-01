import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  getMe: () => api.get('/auth/me'),
  logout: () => api.post('/auth/logout'),
  loginWithGoogle: () => {
    window.location.href = `${API_URL}/auth/google`;
  }
};

export const explainAPI = {
  explainCode: (code, language, mode = 'explain') => 
    api.post('/explain', { code, language, mode })
};

export const historyAPI = {
  getHistory: (params = {}) => api.get('/history', { params }),
  getHistoryItem: (id) => api.get(`/history/${id}`),
  deleteHistoryItem: (id) => api.delete(`/history/${id}`),
  clearHistory: () => api.delete('/history')
};

export default api;
