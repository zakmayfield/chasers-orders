import { getShippingAddress } from '@/services/queries/getShippingAddress';
import { QueryKeys } from '@/types/hooks';
import { useCustomQuery } from './useCustomQuery';
import { ShippingData } from '@/types/user';

export const useGetShippingAddress = () => {
  const { data, isFetching, error } = useCustomQuery<ShippingData>({
    queryKey: [QueryKeys.SHIPPING],
    queryFn: getShippingAddress,
    staleTime: Infinity,
  });

  return { data, isFetching, error };
};
