'use client';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/store';
import type { Product } from '@/types';
import ProductsTable from './ProductsTable';

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
      <h1>Products</h1>
      <ul>
        {data.map(({ id, name }) => (
          <li key={id}>{name}</li>
        ))}
      </ul>

      <ProductsTable products={data} />
    </div>
  );
}
