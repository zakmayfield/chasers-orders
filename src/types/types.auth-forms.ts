import { z } from 'zod';
import {
  AuthSignInValidator,
  AuthSignUpValidator,
} from '../lib/validator.auth-form';

export type SignInFormData = z.infer<typeof AuthSignInValidator>;
export type SignUpFormData = z.infer<typeof AuthSignUpValidator>;
