import { Container } from '@/shared/components/ui';
import { CartItem } from '@/types/cart';

export const OrderSummaryItem = ({ cartItem }: { cartItem: CartItem }) => {
  const {
    quantity,
    unit: {
      size,
      product: { name, category },
    },
  } = cartItem;

  return (
    <Container
      as='div'
      padding='md'
      rounded='sm'
      flex='col'
      className='bg-slate-50 gap-1'
    >
      <Container as='div' flex='row' className='justify-between'>
        <Container as='p'>{name}</Container>
        <Container as='p'>x{quantity}</Container>
      </Container>

      <Container as='div' flex='row' className='justify-between'>
        <Container as='p' className='italic text-gray-600'>
          {category.toLowerCase()}
        </Container>
        <Container as='p' className='italic text-gray-600'>
          {size}
        </Container>
      </Container>
    </Container>
  );
};
