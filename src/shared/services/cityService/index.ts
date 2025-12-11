import { Endpoints, Environment } from '@/shared/environment';
import type { ICity, IDetailCity } from '@/shared/interfaces';
import { api } from '../api';

export const cityService = {
  getAllCity: async (page = 1, filter = '') => {
    const { data, headers } = await api.get<ICity[]>(`${Endpoints.CITIES}?_page=${page}&_limit=${Environment.LIMIT_LINE}&name_like=${filter}`);

    return {
      items: data,
      totalCount: Number(headers['x-total-count'])
    };
  },

  getByIdCity: async (id: number) => {
    return await api.get<IDetailCity>(`${Endpoints.CITIES}/${id}`);
  },

  createCity: async (data: Omit<IDetailCity, 'id'>) => {
    const { data: result } = await api.post<IDetailCity>(Endpoints.CITIES, data);
    return result.id;
  },

  updateByIdCity: async (id: number, data: IDetailCity) => {
    await api.put<void>(`${Endpoints.CITIES}/${id}`, data);
  },

  deleteByIdCity: async (id: number) => {
    await api.delete<void>(`${Endpoints.CITIES}/${id}`);
  }
};
