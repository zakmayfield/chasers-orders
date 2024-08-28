import { useCustomQuery } from '@/shared/hooks/custom';
import { getProducts } from '@/services/queries/getProducts';
import { ProductWithUnits } from '@/types/products';
import { QueryKeys } from '@/shared/types/Cache';

export const useGetProducts = () => {
  const { data, error, isLoading } = useCustomQuery<ProductWithUnits[]>({
    queryKey: [QueryKeys.PRODUCTS],
    queryFn: getProducts,
  });

  return { data, error, isLoading };
};
