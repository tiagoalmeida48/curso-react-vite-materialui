import { Endpoints, Environment } from '@/shared/environment';
import type { IDetailUser, IUser } from '@/shared/interfaces';
import { api } from '../api';

export const userService = {
  getAllUser: async (page = 1, filter = '') => {
    const { data, headers } = await api.get<IUser[]>(`${Endpoints.USERS}?_page=${page}&_limit=${Environment.LIMIT_LINE}&name_like=${filter}`);

    return {
      items: data,
      totalCount: Number(headers['x-total-count'])
    };
  },

  getByIdUser: async (id: number) => {
    return await api.get<IDetailUser>(`${Endpoints.USERS}/${id}`);
  },

  createUser: async (data: Omit<IDetailUser, 'id'>) => {
    const { data: result } = await api.post<IDetailUser>(Endpoints.USERS, data);
    return result.id;
  },

  updateByIdUser: async (id: number, data: IDetailUser) => {
    await api.put<void>(`${Endpoints.USERS}/${id}`, data);
  },

  deleteByIdUser: async (id: number) => {
    await api.delete<void>(`${Endpoints.USERS}/${id}`);
  }
};
