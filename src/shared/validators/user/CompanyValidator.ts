import { z } from 'zod';

export const CompanyValidator = z.object({
  name: z.string().min(1, { message: 'Company Name is a required field' }),
  accountPayableEmail: z.string(), // optional
  paymentMethod: z
    .string()
    .min(1, { message: 'Payment Method is a required field' }),
});
