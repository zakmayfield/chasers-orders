import {
  UseMutateFunction,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import {
  CartCache,
  CartItem,
  DeliveryInstructionsResponse,
  UpdateCartItemQuantityParams,
} from '@/types/cart';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  DeliveryInstructionsData,
  DeliveryInstructionsValidator,
} from '@/shared/validators/cart/DeliveryInstructionsValidator';
import {
  QuantityValidator,
  QuantityData,
} from '@/shared/validators/cart/QuantityValidator';
import {
  FormState,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
  useForm,
} from 'react-hook-form';
import { FormEvent } from 'react';
import { updateCartItemQuantity } from '@/services/mutations/updateCartItemQuantity';
import { updateDeliveryInstructions } from '@/services/mutations/updateDeliveryInstructions';

interface UseInstructionEditFormProps {
  ({
    deliveryInstructions,
  }: {
    deliveryInstructions: string | null | undefined;
  }): {
    formState: FormState<DeliveryInstructionsData>;
    register: UseFormRegister<DeliveryInstructionsData>;
    handleSubmit: UseFormHandleSubmit<DeliveryInstructionsData>;
    getValues: UseFormGetValues<DeliveryInstructionsData>;
    reset: UseFormReset<DeliveryInstructionsData>;
  };
}

export const useInstructionEditForm: UseInstructionEditFormProps = ({
  deliveryInstructions,
}) => {
  const { register, handleSubmit, getValues, reset, formState } =
    useForm<DeliveryInstructionsData>({
      resolver: zodResolver(DeliveryInstructionsValidator),
      defaultValues: {
        deliveryInstructions: deliveryInstructions ? deliveryInstructions : '',
      },
    });

  return { register, handleSubmit, getValues, reset, formState };
};

interface UseEditInstructionsMutation {
  ({ successCallback }: { successCallback?: () => void }): {
    editDeliveryInstructions: UseMutateFunction<
      DeliveryInstructionsResponse,
      unknown,
      DeliveryInstructionsData,
      unknown
    >;
  };
}

export const useEditInstructionsMutation: UseEditInstructionsMutation = ({
  successCallback,
}) => {
  const queryClient = useQueryClient();

  const { mutate: editDeliveryInstructions } = useMutation({
    mutationFn: updateDeliveryInstructions,
    onSuccess(data) {
      setDataToCache(data);
      successCallback?.();
    },
  });

  function setDataToCache(data: DeliveryInstructionsResponse) {
    queryClient.setQueryData(
      ['shipping-address'],
      (oldData: DeliveryInstructionsResponse | undefined) =>
        oldData
          ? {
              ...oldData,
              shippingAddress: data.shippingAddress,
            }
          : oldData
    );
  }

  return { editDeliveryInstructions };
};

interface UseUpdateQuantityProps {
  ({
    onSuccessCallback,
    onErrorCallback,
  }: {
    onSuccessCallback: (data: CartItem) => void;
    onErrorCallback: (error: unknown) => void;
  }): {
    isLoading: boolean;
    isSuccess: boolean;
    updateQuantity: UseMutateFunction<
      CartItem,
      unknown,
      UpdateCartItemQuantityParams,
      unknown
    >;
  };
}

export const useUpdateQuantity: UseUpdateQuantityProps = ({
  onSuccessCallback,
  onErrorCallback,
}) => {
  const {
    mutate: updateQuantity,
    isLoading,
    isSuccess,
  } = useMutation({
    mutationFn: updateCartItemQuantity,
    onSuccess: (data) => {
      onSuccessCallback(data);
    },
    onError(error) {
      if (error instanceof Error) {
        onErrorCallback(error);
      }
    },
  });

  return { updateQuantity, isLoading, isSuccess };
};

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
