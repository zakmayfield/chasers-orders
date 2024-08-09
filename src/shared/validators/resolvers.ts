import { zodResolver } from '@hookform/resolvers/zod';
import {
  AuthSignInValidator,
  AuthSignUpValidator,
} from '@/shared/validators/auth';
import { DeliveryInstructionsValidator } from '@/shared/validators/cart/DeliveryInstructionsValidator';
import { QuantityValidator } from '@/shared/validators/cart/QuantityValidator';
import { ContactValidator } from '@/shared/validators/user/ContactValidator';
import { CompanyValidator } from './user/CompanyValidator';

export const signInResolver = zodResolver(AuthSignInValidator);
export const signUpResolver = zodResolver(AuthSignUpValidator);
export const quantityResolver = zodResolver(QuantityValidator);
export const contactResolver = zodResolver(ContactValidator);
export const companyResolver = zodResolver(CompanyValidator);
export const deliveryInstructionsResolver = zodResolver(
  DeliveryInstructionsValidator
);
