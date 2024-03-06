import { FC } from 'react';
import { ProductsTable } from './ProductsTable';

interface ProductsProps {}

export const Products: FC<ProductsProps> = ({}) => {
  return (
    <div>
      <ProductsTable />
    </div>
  );
};
