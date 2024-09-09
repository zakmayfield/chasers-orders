import { SelectSize } from '@/features/cart/atoms/cart_items_list/SelectSize';
import { SelectQuantity } from '@/features/cart/atoms/cart_items_list/SelectQuantity';
import { TCartItem } from '@/shared/types/Cart';
import { ContentWrapper, Text } from '@/shared/components/containers';
import { RemoveItemButton } from '@/features/cart/atoms/cart_items_list/RemoveItemButton';

export const CartItem = ({ cartItem }: { cartItem: TCartItem }) => {
  return (
    <ContentWrapper flex='row' rounded='lg' className='border'>
      <RemoveItemButton product_variant_id={cartItem.product_variant_id} />

      <ContentWrapper flex='col'>
        <ContentWrapper flex='row'>
          <Text>{cartItem.product_variant?.product?.name}</Text>
          <Text>{cartItem.product_variant?.size}</Text>
          <Text>x{cartItem.quantity}</Text>
        </ContentWrapper>

        <ContentWrapper flex='row'>
          <Text>Size</Text>
          <Text>Qty</Text>
        </ContentWrapper>
      </ContentWrapper>
    </ContentWrapper>
  );
};
