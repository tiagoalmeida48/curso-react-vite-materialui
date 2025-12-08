import { Environment } from '../../../environment';
import type { IDetailUser, IUser } from '../../../interfaces';
import type { TUsersWithTotalCount } from '../../../types';
import { api } from '../axios-config';

const getAll = async (page = 1, filter = ''): Promise<TUsersWithTotalCount> => {
  try {
    const urlRelative = `users?_page=${page}&_limit=${Environment.LIMIT_LINE}&name_like=${filter}`;
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

const getById = async (id: number): Promise<IUser> => {
  try {
    const { data } = await api.get(`users/${id}`);

    if (data) {
      return data;
    }

    throw new Error('Erro ao consultar o registro');
  } catch (error) {
    throw new Error((error as { message: string }).message || 'Erro ao consultar o registro');
  }
};

const create = async (user: Omit<IDetailUser, 'id'>): Promise<number> => {
  try {
    const { data } = await api.post<IDetailUser>('/users', user);

    if (data) {
      return data.id;
    }

    throw new Error('Erro ao criar o registro');
  } catch (error) {
    throw new Error((error as { message: string }).message || 'Erro ao criar o registro');
  }
};

const updateById = async (id: number, user: IDetailUser): Promise<void> => {
  try {
    await api.put<IDetailUser>(`users/${id}`, user);
  } catch (error) {
    throw new Error((error as { message: string }).message || 'Erro ao atualizar o registro');
  }
};

const deleteById = async (id: number): Promise<void> => {
  try {
    await api.delete(`users/${id}`);
  } catch (error) {
    throw new Error((error as { message: string }).message || 'Erro ao deletar o registro');
  }
};

export const UsersService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
};
