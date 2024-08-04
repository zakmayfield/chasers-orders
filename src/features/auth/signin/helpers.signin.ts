import { signIn } from 'next-auth/react';
import {
  FormState,
  UseFormHandleSubmit,
  UseFormRegister,
  useForm,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthSignInValidator, SignInFormData } from '@/shared/validators/auth';

export const signInWithCredentials = async (data: SignInFormData) => {
  try {
    await signIn('sign-in', {
      ...data,
    });
  } catch (err) {
    console.error(err);
  }
};

interface UseSignInForm {
  (): {
    register: UseFormRegister<SignInFormData>;
    handleSubmit: UseFormHandleSubmit<SignInFormData, undefined>;
    formState: FormState<SignInFormData>;
  };
}

export const useSignInForm: UseSignInForm = () => {
  const { formState, register, handleSubmit } = useForm<SignInFormData>({
    resolver: zodResolver(AuthSignInValidator),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return { register, handleSubmit, formState };
};
