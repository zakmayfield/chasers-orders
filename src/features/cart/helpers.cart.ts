import {
  UseMutateFunction,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import {
  deliveryInstructionsMutation,
  getCart,
} from '@/features/cart/services.cart';
import { CartCache, DeliveryInstructionsData } from '@/features/cart/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { DeliveryInstructionsValidator } from './validator/validator.delivery-instructions';
import { UseFormHandleSubmit, UseFormRegister, useForm } from 'react-hook-form';

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

interface UseEditDeliveryInstructionsFormProps {
  ({ deliveryInstructions }: { deliveryInstructions: string }): {
    register: UseFormRegister<DeliveryInstructionsData>;
    handleSubmit: UseFormHandleSubmit<DeliveryInstructionsData>;
  };
}

export const useEditDeliveryInstructionsForm: UseEditDeliveryInstructionsFormProps =
  ({ deliveryInstructions }) => {
    const { register, handleSubmit } = useForm<DeliveryInstructionsData>({
      resolver: zodResolver(DeliveryInstructionsValidator),
      defaultValues: {
        deliveryInstructions,
      },
    });

    return { register, handleSubmit };
  };

interface UseEditInstructionsMutation {
  (): {
    editDeliveryInstructions: UseMutateFunction<
      {
        shippingAddress: {
          deliveryInstructions: string | null;
        } | null;
      },
      unknown,
      DeliveryInstructionsData,
      unknown
    >;
  };
}

export const useEditInstructionsMutation: UseEditInstructionsMutation = () => {
  const { mutate: editDeliveryInstructions } = useMutation({
    mutationFn: deliveryInstructionsMutation,
  });

  return { editDeliveryInstructions };
};
