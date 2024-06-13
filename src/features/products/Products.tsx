import { FC } from 'react';
import { ProductsTable } from './ProductsTable';
import { CustomProduct } from '../custom-product';

interface ProductsProps {}

export const Products: FC<ProductsProps> = ({}) => {
  return (
    <div>
      <ProductsTable />
      {/* TODO: Custom juice component */}
      <CustomProduct />
    </div>
  );
};
