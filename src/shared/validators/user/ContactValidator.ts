import { z } from 'zod';

export const ContactValidator = z.object({
  name: z.string().min(1, { message: 'Contact Name is a required field' }),
  position: z.string(), // optional
  phoneNumber: z
    .string()
    .min(1, { message: 'Contact Phone Number is a required field' }),
});
