import { Endpoints } from '@/shared/environment';
import { api } from '../api';

export const authService = {
  auth: async (email: string, password: string) => {
    return await api.get<string>(Endpoints.AUTH, { data: { email, password } });
  }
};
