import { z } from 'zod';

export const citySchema = z.object({
  name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres')
});
export type CityFormData = z.infer<typeof citySchema>;
