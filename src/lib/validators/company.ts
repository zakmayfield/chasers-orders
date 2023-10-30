import { z } from 'zod';

export const EditCompanyValidator = z.object({
  name: z
    .string()
    .min(2)
    .max(32)
    .regex(/^[a-zA-Z0-9_ ]+$/),
});
