'use client';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/store/products.get';
import ProductsTable from './ui/ProductsTable';
import type { Product as ProductType, Unit } from '@prisma/client';

export type Product = ProductType & {
  units: Unit[];
};

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
