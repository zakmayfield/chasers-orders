import { EmptyCartIcon } from '@/shared/utils/ui';
import { GoToShopButton } from '@/features/cart/atoms/cart_items_list/GoToShopButton';
import { ContentWrapper, Text } from '@/shared/components/containers';

export const CartItemsEmpty = () => {
  return (
    <ContentWrapper
      padding='lg'
      rounded='lg'
      width='sm'
      position='center'
      className='bg-slate-100'
    >
      <ContentWrapper flex='col'>
        <ContentWrapper flex='row' position='center'>
          <EmptyCartIcon />
          <Text as='span'>Your cart is empty</Text>
        </ContentWrapper>

        <GoToShopButton />
      </ContentWrapper>
    </ContentWrapper>
  );
};
