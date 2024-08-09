import { zodResolver } from '@hookform/resolvers/zod';
import {
  AuthSignInValidator,
  AuthSignUpValidator,
} from '@/shared/validators/auth';
import { DeliveryInstructionsValidator } from '@/shared/validators/cart/DeliveryInstructionsValidator';
import { QuantityValidator } from './cart/QuantityValidator';

export const signInResolver = zodResolver(AuthSignInValidator);
export const signUpResolver = zodResolver(AuthSignUpValidator);
export const deliveryInstructionsResolver = zodResolver(
  DeliveryInstructionsValidator
);
export const quantityResolver = zodResolver(QuantityValidator);
