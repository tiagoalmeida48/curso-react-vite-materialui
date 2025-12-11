import { keepPreviousData, queryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { IDetailCity } from '@/shared/interfaces';
import { cityService } from '@/shared/services';

export const useGetAllCity = (page = 1, filter = '') => {
  return queryOptions({
    queryKey: ['cities', page, filter],
    queryFn: () => cityService.getAllCity(page, filter),
    placeholderData: keepPreviousData
  });
};

export const useGetByIdCity = (id: number | string) => {
  return useQuery({
    queryKey: ['city', id],
    queryFn: () => cityService.getByIdCity(Number(id)),
    enabled: !!id && id !== 'novo'
  });
};

export const useCreateOrUpdateCity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<IDetailCity> & { id?: number }): Promise<number | void> => {
      if (data.id) return cityService.updateByIdCity(data.id, data as IDetailCity);
      return cityService.createCity(data as Omit<IDetailCity, 'id'>);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cities'] });
    }
  });
};

export const useDeleteCity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number): Promise<void> => cityService.deleteByIdCity(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cities'] });
    }
  });
};
