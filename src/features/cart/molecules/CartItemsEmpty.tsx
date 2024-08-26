import { Container } from '@/shared/components/ui';
import { EmptyCartIcon } from '@/shared/utils/ui';
import { GoToShopButton } from '../atoms/GoToShopButton';

export const CartItemsEmpty = () => {
  return (
    <Container
      as='div'
      flex='row'
      padding='lg'
      rounded='sm'
      flexCenter={true}
      className='bg-slate-50'
    >
      <Container as='div' flex='col'>
        <Container as='div' flex='row' className='items-center'>
          <EmptyCartIcon />
          <Container as='span'>Your cart is empty</Container>
        </Container>

        <GoToShopButton />
      </Container>
    </Container>
  );
};
