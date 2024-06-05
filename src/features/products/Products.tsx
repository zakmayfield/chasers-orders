import { FC } from 'react';
import { ProductsTable } from './ProductsTable';

interface ProductsProps {}

export const Products: FC<ProductsProps> = ({}) => {
  return (
    <div>
      <ProductsTable />
      {/* TODO: Custom juice component */}
    </div>
  );
};
