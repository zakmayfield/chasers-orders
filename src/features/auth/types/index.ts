import { z } from 'zod';
import { AuthSignUpValidator } from '../signup/validator/validator.signup';
import { AuthSignInValidator } from '../signin/validator/validator.signin';

export type SignInFormData = z.infer<typeof AuthSignInValidator>;
export type SignUpFormData = z.infer<typeof AuthSignUpValidator>;
