import { keepPreviousData, queryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { IDetailUser } from '@/shared/interfaces';
import { userService } from '@/shared/services';

export const useGetAllUser = (page = 1, filter = '') => {
  return queryOptions({
    queryKey: ['users', page, filter],
    queryFn: () => userService.getAllUser(page, filter),
    placeholderData: keepPreviousData
  });
};

export const useGetByIdUser = (id: number | string) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => userService.getByIdUser(Number(id)),
    enabled: !!id && id !== 'novo'
  });
};

export const useCreateOrUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<IDetailUser> & { id?: number }): Promise<number | void> => {
      if (data.id) return userService.updateByIdUser(data.id, data as IDetailUser);
      return userService.createUser(data as Omit<IDetailUser, 'id'>);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      if (variables.id) {
        queryClient.invalidateQueries({ queryKey: ['user', variables.id] });
      }
    }
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number): Promise<void> => userService.deleteByIdUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    }
  });
};
