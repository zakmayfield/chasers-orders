import { Container } from '@/shared/components/ui';
import { CartItem as CartItemType } from '@/types/cart';
import { RemoveCartItemButton } from '../atoms/RemoveCartItemButton';
import { SelectSize } from '../atoms/SelectSize';
import { SelectQuantity } from '../atoms/SelectQuantity';

export const CartItem = ({ cartItem }: { cartItem: CartItemType }) => {
  const {
    quantity,
    unitId,
    cartId,
    unit: {
      size,
      product: { name, category },
    },
  } = cartItem;

  return (
    <Container
      as='div'
      padding='md'
      flex='row'
      rounded='sm'
      className='items-center gap-6 bg-slate-50'
    >
      <RemoveCartItemButton unitId={unitId} cartId={cartId} />

      <Container as='div' flex='col'>
        <Container as='div' flex='row' className='items-center'>
          <Container as='p'>{name}</Container>
          <Container as='p'>{category}</Container>
        </Container>

        <Container as='div' flex='row' className='items-center gap-6'>
          <SelectSize cartId={cartId} unitId={unitId} currentSize={size} />
          <SelectQuantity cartId={cartId} unitId={unitId} quantity={quantity} />
        </Container>
      </Container>
    </Container>
  );
};
