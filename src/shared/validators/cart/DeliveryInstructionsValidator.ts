import { z } from 'zod';

export const InstructionsValidator = z
  .object({
    deliveryInstructions: z
      .string()
      .min(3, { message: 'Instructions must be 3 or more characters' }),
  })
  .required();
