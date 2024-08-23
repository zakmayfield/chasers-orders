import { Container } from '@/shared/components/ui';
import { CartItem } from '@/types/cart';

export const OrderSummaryItem = ({ cartItem }: { cartItem: CartItem }) => {
  return (
    <Container as='div' padding='md' rounded='sm' className='bg-slate-50'>
      <Container as='p'>{cartItem.unitId}</Container>
    </Container>
  );
};
