import { Container } from '@/shared/components/ui';
import { CartItem as CartItemType } from '@/types/cart';
import { RemoveCartItemButton } from '../atoms/RemoveCartItemButton';
import { SelectSize } from '../atoms/SelectSize';
import { SelectQuantity } from '../atoms/SelectQuantity';

export const CartItem = ({ cartItem }: { cartItem: CartItemType }) => {
  return (
    <Container
      as='div'
      padding='md'
      flex='row'
      rounded='sm'
      className='items-center gap-6 bg-slate-50'
    >
      <RemoveCartItemButton unitId={cartItem.unitId} cartId={cartItem.cartId} />

      <Container as='div' flex='col'>
        <Container as='div' flex='row' className='items-center'>
          <Container as='p'>{cartItem.unit.product.name}</Container>
          <Container as='p'>{cartItem.unit.product.category}</Container>
        </Container>

        <Container as='div' flex='row' className='items-center gap-6'>
          <SelectSize
            cartId={cartItem.cartId}
            unitId={cartItem.unitId}
            currentSize={cartItem.unit.size}
          />
          <SelectQuantity
            cartId={cartItem.cartId}
            unitId={cartItem.unitId}
            quantity={cartItem.quantity}
          />
        </Container>
      </Container>
    </Container>
  );
};
