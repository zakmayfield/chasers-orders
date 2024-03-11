import { z } from 'zod';

export const DeliveryInstructionsValidator = z
  .object({
    deliveryInstructions: z.string().email().min(3),
  })
  .required();
