import type { AxiosError } from 'axios';

export const ErrorInterceptor = (error: AxiosError) => {
  if (error.message === 'Network Error') return Promise.reject(new Error('Erro de rede'));

  if (error.response?.status === 401) {
    // redirecionar para a tela de login
  }

  return Promise.reject(error);
};
