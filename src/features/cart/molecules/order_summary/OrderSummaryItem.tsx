import { ContentWrapper, Text } from '@/shared/components/containers';
import { TCartItem } from '@/shared/types/Cart';

export const OrderSummaryItem = ({ cartItem }: { cartItem: TCartItem }) => {
  const { quantity, product_variant } = cartItem;

  return (
    <ContentWrapper padding='sm' flex='row' className='border items-start'>
      <ContentWrapper flex='col' width='md' className='items-start'>
        <Text>{product_variant?.product?.name}</Text>
        <Text className=''>
          {product_variant?.product?.category?.name.toLowerCase()}
        </Text>
      </ContentWrapper>

      <ContentWrapper flex='col' className='items-end sm:items-start'>
        <Text>x{quantity}</Text>
        <Text className=''>{product_variant?.size}</Text>
      </ContentWrapper>
    </ContentWrapper>
  );
};
