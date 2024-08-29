import { useCustomQuery } from '@/shared/hooks/custom';
import { QueryKeys } from '@/shared/types/Cache';
import { orderServices } from '@/shared/utils/services/orderServices';

export const useGetOrders = ({ hasLineItems }: { hasLineItems: boolean }) => {
  const { data, isLoading, error } = useCustomQuery({
    queryKey: [QueryKeys.ORDERS],
    queryFn: async () => await orderServices.getOrders({ hasLineItems }),
    staleTime: Infinity,
  });
  return { data, isLoading, error };
};

export const useGetOrder = ({
  order_id,
  hasLineItems,
}: {
  order_id: string;
  hasLineItems: boolean;
}) => {
  const { data, isLoading, error } = useCustomQuery({
    queryKey: [QueryKeys.ORDER, order_id],
    queryFn: async () =>
      await orderServices.getOrder({ order_id, hasLineItems }),
    staleTime: Infinity,
  });
  return { data, isLoading, error };
};
