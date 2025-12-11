import axios from 'axios';
import { Environment } from '@/shared/environment';
import { auth } from './auth';

export const api = axios.create({
  baseURL: Environment.API_BASE_URL
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(Environment.LOCAL_STORAGE_KEY__ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      auth.removeToken();
      setTimeout(() => (window.location.href = '/'), 3000);
    }

    return Promise.reject(error);
  }
);
