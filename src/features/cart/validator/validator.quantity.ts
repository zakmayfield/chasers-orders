import { z } from 'zod';

export const QuantityValidator = z
  .object({
    quantity: z
      .number()
      .min(0, 'Quantity must be at least 0')
      .max(100, 'Quantity must be less than or equal to 100'),
  })
  .required();
