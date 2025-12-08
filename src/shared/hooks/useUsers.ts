import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { IDetailUser } from '../interfaces';
import { UsersService } from '../services/api/users/UsersService';

export const useUsers = (page = 1, filter = '') => {
  return useQuery({
    queryKey: ['users', page, filter],
    queryFn: () => UsersService.getAll(page, filter)
  });
};

export const useUserById = (id: number | string) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => UsersService.getById(Number(id)),
    enabled: !!id && id !== 'novo'
  });
};

export const useUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<IDetailUser> & { id?: number }): Promise<number | void> => {
      if (data.id) return UsersService.updateById(data.id, data as IDetailUser);
      return UsersService.create(data as Omit<IDetailUser, 'id'>);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    }
  });
};

export const useUserDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number): Promise<void> => UsersService.deleteById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    }
  });
};
