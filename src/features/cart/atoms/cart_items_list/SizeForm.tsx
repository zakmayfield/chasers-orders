import { ContentWrapper } from '@/shared/components/containers';
import { SpinLoader } from '@/shared/components/loading';
import { useUpdateSize } from '@/shared/hooks/data/cart/useCart';
import { useGetProduct } from '@/shared/hooks/data/products/useProducts';
import { ChangeEvent } from 'react';

type TSizeFormProps = {
  product_variant_id: string;
  product_id: string;
  currentSize: string;
};

export const SizeForm = (props: TSizeFormProps) => {
  const { product_variant_id, product_id, currentSize } = props;
  const { product, isLoading } = useGetProduct({ product_id });
  const { mutate } = useUpdateSize();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const size = e.target.value;

    const new_variant_id = product?.variants.find(
      (variant) => variant.size === size
    )?.product_variant_id!;

    const args = {
      product_variant_id,
      new_variant_id,
    };

    mutate({ ...args });
  };

  return (
    <form>
      <ContentWrapper flex='row'>
        <label htmlFor='size'>Size</label>
        {isLoading ? (
          <SpinLoader
            containerClassName='w-24 h-8 rounded border px-3 bg-white flex items-center'
            position='left'
          />
        ) : (
          <select
            name='size'
            id='size'
            value={currentSize}
            className='h-8 rounded w-24 border px-3'
            onChange={(e) => handleChange(e)}
          >
            {product?.variants.map((variant) => (
              <option key={variant.product_variant_id}>{variant.size}</option>
            ))}
          </select>
        )}
      </ContentWrapper>
    </form>
  );
};
