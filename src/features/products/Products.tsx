'use client';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/store/products/productStore';
import type { Product } from '@/types';
import ProductsTable from './ui/ProductsTable';

export default function Products() {
  const { isLoading, isError, data, error } = useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: getProducts,
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
