import { z } from 'zod';

export const AuthSignInValidator = z
  .object({
    email: z.string().email().min(3),
    password: z
      .string()
      .min(3, { message: 'Password must be 3 or more characters' }),
  })
  .required();
