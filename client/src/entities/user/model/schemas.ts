import z from 'zod';

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string().nullable().optional(),
  role: z.enum(['user', 'admin']),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});
