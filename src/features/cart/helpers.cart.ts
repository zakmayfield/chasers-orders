import { zodResolver } from '@hookform/resolvers/zod';
import {
  QuantityValidator,
  QuantityData,
} from '@/shared/validators/cart/QuantityValidator';
import {
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  useForm,
} from 'react-hook-form';
import { FormEvent } from 'react';

interface IUseQuantityUpdateForm {
  ({ currentQuantity }: { currentQuantity: number }): {
    handleSubmit: UseFormHandleSubmit<QuantityData, undefined>;
    register: UseFormRegister<QuantityData>;
    getValues: UseFormGetValues<QuantityData>;
    handleReset(): void;
    handleCancel(): void;
    isDirty: boolean;
  };
}

export const useQuantityUpdateForm: IUseQuantityUpdateForm = ({
  currentQuantity,
}) => {
  const {
    handleSubmit,
    register,
    getValues,
    reset,
    formState: { isDirty },
  } = useForm({
    resolver: zodResolver(QuantityValidator),
    defaultValues: {
      quantity: currentQuantity,
    },
  });

  function handleReset(event?: FormEvent) {
    event && event.preventDefault();
    const formValues = getValues();

    reset({
      quantity: formValues.quantity,
    });
  }

  function handleCancel() {
    reset({ quantity: currentQuantity });
  }

  return {
    handleSubmit,
    register,
    getValues,
    handleReset,
    handleCancel,
    isDirty,
  };
};
