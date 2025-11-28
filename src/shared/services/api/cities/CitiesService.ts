import { api } from '../axios-config';
import { Environment } from '../../../environment';
import type { TCitiesWithTotalCount } from '../../../types';
import type { IDetailCity, ICity } from '../../../interfaces';

const getAll = async (page = 1, filter = ''): Promise<TCitiesWithTotalCount | Error> => {
  try {
    const urlRelative = `cities?_page=${page}&_limit=${Environment.LIMIT_LINE}&name_like=${filter}`;
    const { data, headers } = await api.get(urlRelative);

    if (data) {
      return {
        data,
        totalCount: Number(headers['x-total-count'])
      };
    }

    return new Error('Erro ao listar os registros');
  } catch (error) {
    return new Error((error as { message: string }).message || 'Erro ao listar os registros');
  }
};

const getById = async (id: number): Promise<ICity | Error> => {
  try {
    const { data } = await api.get(`cities/${id}`);

    if (data) {
      return data;
    }

    return new Error('Erro ao consultar o registro');
  } catch (error) {
    return new Error((error as { message: string }).message || 'Erro ao consultar o registro');
  }
};

const create = async (city: Omit<IDetailCity, 'id'>): Promise<number | Error> => {
  try {
    const { data } = await api.post<IDetailCity>('/cities', city);

    if (data) {
      return data.id;
    }

    return new Error('Erro ao criar o registro');
  } catch (error) {
    return new Error((error as { message: string }).message || 'Erro ao criar o registro');
  }
};

const updateById = async (id: number, city: IDetailCity): Promise<void | Error> => {
  try {
    await api.put<IDetailCity>(`cities/${id}`, city);
  } catch (error) {
    return new Error((error as { message: string }).message || 'Erro ao atualizar o registro');
  }
};

const deleteById = async (id: number): Promise<void | Error> => {  
  try {
    await api.delete(`cities/${id}`);
  } catch (error) {
    return new Error((error as { message: string }).message || 'Erro ao deletar o registro');
  }
};

export const CitiesService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
};
