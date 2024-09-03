import { useState } from 'react';
import { useToast } from './useToast';
import { useCustomForm, useCustomMutation } from '../custom';
import { userServices } from '@/shared/utils/services/userServices';
import { PasswordFormData } from '@/shared/types/Forms';
import { passwordResolver } from '@/shared/validators/resolvers';

export const useChangePasswordForm = () => {
  const { notify } = useToast();

  const { mutate } = useCustomMutation({
    mutationFn: userServices.changePassword,
    handleError(error) {
      notify(error.message, 'error');
    },
    handleSuccess(data) {
      notify(data);
      reset(formState.defaultValues);
    },
  });

  const {
    methods: { register, handleSubmit, getValues, reset, formState },
  } = useCustomForm<PasswordFormData>({
    defaultValues: {
      old_password: '',
      new_password: '',
    },
    resolver: passwordResolver,
  });

  const submit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const values = getValues();
    handleSubmit(() => mutate(values))();
  };

  const cancel = () => reset(formState.defaultValues);

  const [canSeePassword, setCanSeePassword] = useState({
    old: false,
    new: false,
  });

  return {
    submit,
    register,
    cancel,
    canSeePassword,
    setCanSeePassword,
    formState,
  };
};
