import { signIn } from 'next-auth/react';
import { SignInFormData, SignUpFormData } from '@/types/auth';

//^ AUTH
export const handleSignIn = async (data: SignInFormData) =>
  await signIn('sign-in', {
    ...data,
  });

export const handleSignUp = async (data: SignUpFormData) => {
  try {
    await signIn('sign-up', {
      ...data,
    });

    return {
      isSuccess: true,
    };
  } catch (err) {
    return {
      isSuccess: false,
    };
  }
};
