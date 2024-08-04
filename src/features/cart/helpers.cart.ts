import {
  UseMutateFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  addItem,
  deliveryInstructionsMutation,
  getCart,
  updateItemQuantity,
} from '@/features/cart/services.cart';
import {
  CartCache,
  CartItem,
  DeliveryInstructionsResponse,
  UpdateQuantity,
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

interface UseFetchCartQuery {
  (): {
    data: CartCache | undefined;
    isFetching: boolean;
  };
}

export const useFetchCartQuery: UseFetchCartQuery = () => {
  const { data, isFetching } = useQuery<CartCache, Error>({
    queryKey: ['cart'],
    queryFn: getCart,
    staleTime: Infinity,
  });

  return { data, isFetching };
};

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
    mutationFn: deliveryInstructionsMutation,
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

interface UseAddToCartMutationProps {
  ({
    onSuccessCallback,
    onErrorCallback,
  }: {
    onSuccessCallback: (data: CartItem) => void;
    onErrorCallback: (error: unknown, variables: string) => void;
  }): {
    addToCartMutation: UseMutateFunction<CartItem, unknown, string, unknown>;
  };
}

export const useAddToCartMutation: UseAddToCartMutationProps = ({
  onSuccessCallback,
  onErrorCallback,
}) => {
  const queryClient = useQueryClient();

  const { mutate: addToCartMutation } = useMutation({
    mutationFn: addItem,
    onSuccess(data) {
      onSuccessCallback(data);
      setDataToCache(data);
    },
    onError(error, variables) {
      onErrorCallback(error, variables);
    },
  });

  function setDataToCache(data: CartItem) {
    queryClient.setQueryData(['cart'], (oldData: CartCache | undefined) =>
      oldData
        ? {
            ...oldData,
            items: [data, ...oldData.items],
          }
        : oldData
    );
  }

  return { addToCartMutation };
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
      UpdateQuantity,
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
    mutationFn: updateItemQuantity,
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
