import { z } from 'zod';

export const AuthSignInValidator = z
  .object({
    email: z.string().email().min(3),
    password: z
      .string()
      .min(3, { message: 'Password must be 3 or more characters' }),
  })
  .required();

// TODO: set { message } for each required input
export const AuthSignUpValidator = z.object({
  email: z.string().email().min(3),
  password: z
    .string()
    .min(3, { message: 'Password must be 3 or more characters' }),
  // contact
  contactName: z.string().min(1),
  contactPosition: z.string(), // optional
  contactPhoneNumber: z.string().min(1),
  // company
  companyName: z.string().min(1),
  accountPayableEmail: z.string().min(1),
  paymentMethod: z.string().min(1),
  // shipping
  shippingStreetAddress: z.string().min(1),
  shippingUnit: z.string(), // optional
  shippingCity: z.string().min(1),
  shippingState: z.string().min(1),
  shippingPostalCode: z.string().min(1),
  deliveryInstructions: z.string(),
  //billing
  billingStreetAddress: z.string().min(1),
  billingUnit: z.string(), // optional
  billingCity: z.string().min(1),
  billingState: z.string().min(1),
  billingPostalCode: z.string().min(1),
});
