import { z } from 'zod';

export const DeliveryInstructionsValidator = z
  .object({
    deliveryInstructions: z
      .string()
      .min(3, { message: 'Instructions must be 3 or more characters' }),
  })
  .required();
