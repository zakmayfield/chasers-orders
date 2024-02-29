import { DashboardUserData } from '@/types/types.dashboard';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export const ContactValidator = z.object({
  contactName: z
    .string()
    .min(1, { message: 'Contact Name is a required field' }),
  contactPosition: z.string(), // optional
  contactPhoneNumber: z
    .string()
    .min(1, { message: 'Contact Phone Number is a required field' }),
});

export type ContactFormData = z.infer<typeof ContactValidator>;

export const getDefaultValues = (userData: DashboardUserData) => {
  return {
    contactName: userData.contact.name,
    contactPhoneNumber: userData.contact.phoneNumber,
    contactPosition:
      (userData.contact.position && userData.contact.position) || '',
  };
};

export const resolver = zodResolver(ContactValidator);
