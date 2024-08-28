import { z } from 'zod';
import { AuthSignInValidator, AuthSignUpValidator } from '../validators/auth';
import { InstructionsValidator } from '../validators/cart/DeliveryInstructionsValidator';
import { CompanyValidator } from '../validators/user/CompanyValidator';

export type SignInFormData = z.infer<typeof AuthSignInValidator>;
export type SignUpFormData = z.infer<typeof AuthSignUpValidator>;
export type InstructionsFormData = z.infer<typeof InstructionsValidator>;
export type CompanyFormData = z.infer<typeof CompanyValidator>;
type AdjustedContactFormData = z.ZodObject<
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
export type ContactFormData = z.infer<AdjustedContactFormData>;

export type SignUpFormSteps = '1' | '2' | '3' | '4';

interface ISignUpFormFields {
  [step: string]: Field[];
}

type Field =
  | 'email'
  | 'password'
  | 'contactName'
  | 'contactPhoneNumber'
  | 'companyName'
  | 'accountPayableEmail'
  | 'paymentMethod'
  | 'shippingStreetAddress'
  | 'shippingUnit'
  | 'shippingCity'
  | 'shippingState'
  | 'shippingPostalCode'
  | 'billingStreetAddress'
  | 'billingUnit'
  | 'billingCity'
  | 'billingState'
  | 'billingPostalCode';
