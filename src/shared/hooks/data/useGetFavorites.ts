import { useCustomQuery } from '@/shared/hooks/custom';
import { getFavorites } from '@/services/queries/getFavorites';
import { QueryKeys } from '@/types/hooks';

export const useGetFavorites = () => {
  const { data, error, isLoading } = useCustomQuery({
    queryKey: [QueryKeys.FAVORITES],
    queryFn: getFavorites,
    staleTime: Infinity,
  });

  return { data, error, isLoading };
};
