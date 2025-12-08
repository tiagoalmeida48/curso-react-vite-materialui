import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { IDetailCity } from '../interfaces';
import { CitiesService } from '../services/api/cities/CitiesService';

export const useCities = (page = 1, filter = '') => {
  return useQuery({
    queryKey: ['cities', page, filter],
    queryFn: () => CitiesService.getAll(page, filter)
  });
};

export const useCityById = (id: number | string) => {
  return useQuery({
    queryKey: ['city', id],
    queryFn: () => CitiesService.getById(Number(id)),
    enabled: !!id && id !== 'novo'
  });
};

export const useCityMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<IDetailCity> & { id?: number }): Promise<number | void> => {
      if (data.id) return CitiesService.updateById(data.id, data as IDetailCity);
      return CitiesService.create(data as Omit<IDetailCity, 'id'>);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cities'] });
    }
  });
};

export const useCityDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number): Promise<void> => CitiesService.deleteById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cities'] });
    }
  });
};
