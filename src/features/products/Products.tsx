'use client';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/store/products.get';
import ProductsTable from './ui/ProductsTable';
import type { ProductWithUnits } from '@/types/types.product';

export default function Products() {
  const { isLoading, isError, data, error } = useQuery<
    ProductWithUnits[],
    Error
  >({
    queryKey: ['products'],
    queryFn: getProducts,
    staleTime: Infinity,
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div>
      <ProductsTable products={data} />
    </div>
  );
}
