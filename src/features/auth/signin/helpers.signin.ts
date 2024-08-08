import {
  FormState,
  UseFormHandleSubmit,
  UseFormRegister,
  useForm,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthSignInValidator, SignInFormData } from '@/shared/validators/auth';
import { defaultSignInFormValues } from '@/utils/constants';

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
    defaultValues: defaultSignInFormValues,
  });

  return { register, handleSubmit, formState };
};
