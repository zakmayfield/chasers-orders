import {
  useGetProduct,
  useGetProducts,
} from '@/shared/hooks/data/products/useProducts';
import { useEffect } from 'react';

type TSizeFormProps = {
  product_variant_id: string;
  product_id: string;
  currentSize: string;
};

export const SizeForm = (props: TSizeFormProps) => {
  const { product_variant_id, product_id, currentSize } = props;
  const { product, isLoading } = useGetProduct({ product_id });
  // const { products } = useGetProducts({ take: 5 });

  useEffect(() => {
    console.log({ product });
  }, [product]);

  return <div>Size Form</div>;
};
