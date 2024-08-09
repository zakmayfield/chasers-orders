import {
  FormState,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
  UseFormSetValue,
  useForm,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthSignUpValidator, SignUpFormData } from '@/shared/validators/auth';
import { defaultSignUpFormValues } from '@/utils/constants';

interface UseSignUpForm {
  (): {
    getValues: UseFormGetValues<SignUpFormData>;
    setValue: UseFormSetValue<SignUpFormData>;
    register: UseFormRegister<SignUpFormData>;
    handleSubmit: UseFormHandleSubmit<SignUpFormData>;
    formState: FormState<SignUpFormData>;
    reset: UseFormReset<SignUpFormData>;
  };
}

export const useSignUpForm: UseSignUpForm = () => {
  // TODO: remvove 'reset' when done with 'shortcut' button
  const { formState, handleSubmit, register, getValues, setValue, reset } =
    useForm<SignUpFormData>({
      resolver: zodResolver(AuthSignUpValidator),
      defaultValues: defaultSignUpFormValues,
    });

  return {
    getValues,
    setValue,
    register,
    handleSubmit,
    formState,
    reset,
  };
};
