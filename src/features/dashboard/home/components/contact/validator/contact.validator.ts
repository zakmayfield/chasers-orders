import { DashboardUserData } from '@/types/types.dashboard';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export const ContactValidator = z.object({
  name: z.string().min(1, { message: 'Contact Name is a required field' }),
  position: z.string(), // optional
  phoneNumber: z
    .string()
    .min(1, { message: 'Contact Phone Number is a required field' }),
});

type AdjustedFormType = z.ZodObject<
  {
    name: z.ZodString;
    position: z.ZodString;
    phoneNumber: z.ZodString;
  },
  'strip',
  z.ZodTypeAny,
  {
    name: string;
    position: string | null;
    phoneNumber: string;
  },
  {
    name: string;
    position: string | null;
    phoneNumber: string;
  }
>;
export type ContactFormData = z.infer<AdjustedFormType>;

export const getDefaultValues = (userData: DashboardUserData) => {
  return {
    name: userData.contact.name,
    phoneNumber: userData.contact.phoneNumber,
    position: (userData.contact.position && userData.contact.position) || '',
  };
};

export const resolver = zodResolver(ContactValidator);
