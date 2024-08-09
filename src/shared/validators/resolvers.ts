import { zodResolver } from '@hookform/resolvers/zod';
import {
  AuthSignInValidator,
  AuthSignUpValidator,
} from '@/shared/validators/auth';

export const signInResolver = zodResolver(AuthSignInValidator);
export const signUpResolver = zodResolver(AuthSignUpValidator);
