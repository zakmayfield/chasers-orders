import { TCartItem } from '@/shared/types/Cart';
import { ContentWrapper, Text } from '@/shared/components/containers';
import { RemoveItemButton } from '@/features/cart/atoms/cart_items_list/RemoveItemButton';
import { QuantityForm } from '@/features/cart/atoms/cart_items_list/QuantityForm';
import { SizeForm } from '@/features/cart/atoms/cart_items_list/SizeForm';

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
          <SizeForm
            product_variant_id={cartItem.product_variant_id}
            product_id={cartItem.product_variant!.product_id}
            currentSize={cartItem.product_variant!.size}
          />
          <QuantityForm
            product_variant_id={cartItem.product_variant_id}
            currentQuantity={cartItem.quantity}
          />
        </ContentWrapper>
      </ContentWrapper>
    </ContentWrapper>
  );
};
