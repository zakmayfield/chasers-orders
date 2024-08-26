import { z } from 'zod';
import { AuthSignInValidator, AuthSignUpValidator } from '../validators/auth';

//^ FORM DATA
export type SignInFormData = z.infer<typeof AuthSignInValidator>;
export type SignUpFormData = z.infer<typeof AuthSignUpValidator>;
