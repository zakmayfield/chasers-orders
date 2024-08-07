import { z } from 'zod';

export const AuthSignUpValidator = z.object({
  email: z.string().email().min(3),
  password: z
    .string()
    .min(3, { message: 'Password must be 3 or more characters' }),
  // contact
  contactName: z
    .string()
    .min(1, { message: 'Contact Name is a required field' }),
  contactPosition: z.string(), // optional
  contactPhoneNumber: z
    .string()
    .min(1, { message: 'Contact Phone Number is a required field' }),
  // company
  companyName: z
    .string()
    .min(1, { message: 'Company Name is a required field' }),
  accountPayableEmail: z.string(), // optional
  paymentMethod: z
    .string()
    .min(1, { message: 'Payment Method is a required field' }),
  // shipping
  shippingStreetAddress: z
    .string()
    .min(1, { message: 'Street Address is a required field' }),
  shippingUnit: z.string(), // optional
  shippingCity: z.string().min(1, { message: 'City is a required field' }),
  shippingState: z.string().min(1, { message: 'State is a required field' }),
  shippingPostalCode: z
    .string()
    .min(1, { message: 'Postal Code is a required field' }),
  deliveryInstructions: z.string(),
  //billing
  billingStreetAddress: z
    .string()
    .min(1, { message: 'Street Address is a required field' }),
  billingUnit: z.string(), // optional
  billingCity: z.string().min(1, { message: 'City is a required field' }),
  billingState: z.string().min(1, { message: 'State is a required field' }),
  billingPostalCode: z
    .string()
    .min(1, { message: 'Postal Code is a required field' }),
});

export type SignUpFormData = z.infer<typeof AuthSignUpValidator>;
