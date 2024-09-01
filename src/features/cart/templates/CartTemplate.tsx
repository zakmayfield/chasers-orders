'use client';
import { Container, PageTemplate } from '@/shared/components/ui';
import { CartItems } from '../organisms/CartItems';
import { OrderSummary } from '../organisms/OrderSummary';
import { Shipping } from '../organisms/Shipping';
import { PlaceOrder } from '../organisms/PlaceOrder';

export const CartTemplate = () => {
  return (
    <PageTemplate title='Cart' width='full' className='border'>
      <Container as='div'>content</Container>
      {/* <Container
        as='div'
        flex='row'
        padding='md'
        flexCenter={true}
        className='items-start'
      >
        <Container as='div' width='lg' padding='sm' rounded='sm'>
          <CartItems />
        </Container>

        <Container as='div' width='sm' flex='col'>
          <Container
            as='div'
            width='full'
            padding='sm'
            rounded='sm'
            border={true}
          >
            <OrderSummary />
          </Container>

          <Container
            as='div'
            width='full'
            padding='sm'
            rounded='sm'
            border={true}
          >
            <Shipping />
          </Container>

          <Container as='div' width='full'>
            <PlaceOrder />
          </Container>

          </Container>
          
      </Container> */}
    </PageTemplate>
  );
};
