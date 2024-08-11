import { FC } from 'react';
import { ProductsTable } from './components/table/ProductsTable';

interface ProductsProps {}

export const Products: FC<ProductsProps> = ({}) => {
  return (
    <div>
      <ProductsTable />
    </div>
  );
};
