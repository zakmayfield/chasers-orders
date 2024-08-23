import { getShippingAddress } from '@/services/queries/getShippingAddress';
import { QueryKeys } from '@/types/hooks';
import { useCustomQuery } from '@/shared/hooks/custom';
import { ShippingData } from '@/types/user';

export const useGetShippingAddress = () => {
  const { data, isLoading, isFetching, error } = useCustomQuery<ShippingData>({
    queryKey: [QueryKeys.SHIPPING],
    queryFn: getShippingAddress,
    staleTime: Infinity,
  });

  return { data, isLoading, isFetching, error };
};
