import { Environment } from '../../../environment';
import type { ICity, IDetailCity } from '../../../interfaces';
import type { TCitiesWithTotalCount } from '../../../types';
import { api } from '../axios-config';

const getAll = async (page = 1, filter = ''): Promise<TCitiesWithTotalCount> => {
  try {
    const urlRelative = `cities?_page=${page}&_limit=${Environment.LIMIT_LINE}&name_like=${filter}`;
    const { data, headers } = await api.get(urlRelative);

    if (data) {
      return {
        data,
        totalCount: Number(headers['x-total-count'])
      };
    }

    throw new Error('Erro ao listar os registros');
  } catch (error) {
    throw new Error((error as { message: string }).message || 'Erro ao listar os registros');
  }
};

const getById = async (id: number): Promise<ICity> => {
  try {
    const { data } = await api.get(`cities/${id}`);

    if (data) {
      return data;
    }

    throw new Error('Erro ao consultar o registro');
  } catch (error) {
    throw new Error((error as { message: string }).message || 'Erro ao consultar o registro');
  }
};

const create = async (city: Omit<IDetailCity, 'id'>): Promise<number> => {
  try {
    const { data } = await api.post<IDetailCity>('/cities', city);

    if (data) {
      return data.id;
    }

    throw new Error('Erro ao criar o registro');
  } catch (error) {
    throw new Error((error as { message: string }).message || 'Erro ao criar o registro');
  }
};

const updateById = async (id: number, city: IDetailCity): Promise<void> => {
  try {
    await api.put<IDetailCity>(`cities/${id}`, city);
  } catch (error) {
    throw new Error((error as { message: string }).message || 'Erro ao atualizar o registro');
  }
};

const deleteById = async (id: number): Promise<void> => {
  try {
    await api.delete(`cities/${id}`);
  } catch (error) {
    throw new Error((error as { message: string }).message || 'Erro ao deletar o registro');
  }
};

export const CitiesService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
};
