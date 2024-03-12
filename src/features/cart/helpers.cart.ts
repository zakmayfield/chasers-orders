import {
  UseMutateFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  deliveryInstructionsMutation,
  getCart,
} from '@/features/cart/services.cart';
import {
  CartCache,
  DeliveryInstructionsData,
  DeliveryInstructionsResponse,
} from '@/features/cart/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { DeliveryInstructionsValidator } from './validator/validator.delivery-instructions';
import {
  FormState,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
  useForm,
} from 'react-hook-form';

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
