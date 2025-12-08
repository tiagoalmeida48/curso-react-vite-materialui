import axios from 'axios';
import { Environment } from '../../../environment';
import { ErrorInterceptor, ResponseInterceptor } from './interceptors';

const api = axios.create({
  baseURL: Environment.API_BASE_URL
});

// Interceptor de request para adicionar token dinamicamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => ResponseInterceptor(response),
  (error) => ErrorInterceptor(error)
);

export { api };
