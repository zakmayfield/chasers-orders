import { SignInFormData } from '@/shared/validators/auth';
import { signIn } from 'next-auth/react';

export const handleSignIn = async (data: SignInFormData) =>
  await signIn('sign-in', {
    ...data,
  });
