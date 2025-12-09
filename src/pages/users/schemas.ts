import { z } from 'zod';

export const userSchema = z.object({
    name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres'),
    email: z.email('Email inválido'),
    cityId: z.number('Cidade inválida')
});
export type UserFormData = z.infer<typeof userSchema>;