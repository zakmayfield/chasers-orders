'use client';
import { Container, PageTemplate } from '@/shared/components/ui';
import { CartItems } from '../organisms/CartItems';
import { OrderSummary } from '../organisms/OrderSummary';

export const CartTemplate = () => {
  return (
    <PageTemplate title='Cart' width='full' className='border'>
      <Container
        as='div'
        flex='row'
        padding='md'
        flexCenter={true}
        border={true}
        className='items-start'
      >
        <Container as='div' width='lg' padding='sm' rounded='sm' border={true}>
          <CartItems />
        </Container>

        <Container as='div' width='sm' padding='sm' rounded='sm' border={true}>
          <OrderSummary />
        </Container>
      </Container>
    </PageTemplate>
  );
};
