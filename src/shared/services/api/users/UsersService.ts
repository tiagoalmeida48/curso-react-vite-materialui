import { api } from '../axios-config';
import { Environment } from '../../../environment';
import type { TUsersWithTotalCount } from '../../../types';
import type { IDetailUser, IUser } from '../../../interfaces';

const getAll = async (page = 1, filter = ''): Promise<TUsersWithTotalCount | Error> => {
  try {
    const urlRelative = `users?_page=${page}&_limit=${Environment.LIMIT_LINE}&name_like=${filter}`;
    const { data, headers } = await api.get(urlRelative);

    if (data) {
      return {
        data,
        totalCount: Number(headers['x-total-count']) || Environment.LIMIT_LINE
      };
    }

    return new Error('Erro ao listar os registros');
  } catch (error) {
    return new Error((error as { message: string }).message || 'Erro ao listar os registros');
  }
};

const getById = async (id: number): Promise<IUser | Error> => {
  try {
    const { data } = await api.get(`users/${id}`);

    if (data) {
      return data;
    }

    return new Error('Erro ao consultar o registro');
  } catch (error) {
    return new Error((error as { message: string }).message || 'Erro ao consultar o registro');
  }
};

const create = async (user: Omit<IDetailUser, 'id'>): Promise<number | Error> => {
  try {
    const { data } = await api.post<IDetailUser>('/users', user);

    if (data) {
      return data.id;
    }

    return new Error('Erro ao criar o registro');
  } catch (error) {
    return new Error((error as { message: string }).message || 'Erro ao criar o registro');
  }
};

const updateById = async (user: IDetailUser): Promise<void | Error> => {
  try {
    await api.put<IDetailUser>(`users/${user.id}`, user);
  } catch (error) {
    return new Error((error as { message: string }).message || 'Erro ao atualizar o registro');
  }
};

const deleteById = async (id: number): Promise<void | Error> => {  
  try {
    await api.delete(`users/${id}`);
  } catch (error) {
    return new Error((error as { message: string }).message || 'Erro ao deletar o registro');
  }
};

export const UsersService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
};
