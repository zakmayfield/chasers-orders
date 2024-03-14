import { z } from 'zod';

export const QuantityValidator = z
  .object({
    quantity: z.number(),
  })
  .required();
