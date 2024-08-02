import { UserData } from '@/types/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export const CompanyValidator = z.object({
  name: z.string().min(1, { message: 'Company Name is a required field' }),
  accountPayableEmail: z.string(), // optional
  paymentMethod: z
    .string()
    .min(1, { message: 'Payment Method is a required field' }),
});

export type CompanyFormData = z.infer<typeof CompanyValidator>;

export const getDefaultValues = (userData: UserData) => {
  return {
    name: userData.company.name,
    accountPayableEmail: userData.company.accountPayableEmail,
    paymentMethod: userData.company.paymentMethod,
  };
};

export const resolver = zodResolver(CompanyValidator);
