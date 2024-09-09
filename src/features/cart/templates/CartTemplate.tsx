'use client';
import { CartItemsList } from '../organisms/CartItemsList';
import { OrderSummary } from '../organisms/OrderSummary';
import { Shipping } from '../organisms/Shipping';
import { PlaceOrder } from '../organisms/PlaceOrder';
import { ContentWrapper, Layout } from '@/shared/components/containers';

export const CartTemplate = () => {
  return (
    <Layout heading='h1' title='Cart' contentClassname=''>
      <CartItemsList />

      <ContentWrapper>
        <OrderSummary />
        <Shipping />
        <PlaceOrder />
      </ContentWrapper>
    </Layout>
  );
};

// <PageTemplate title='Cart' width='full'>
//   <Container
//     as='div'
//     rounded='sm'
//     padding='lg'
//     flex='col'
//     className='bg-slate-50'
//   >
//     <CartItemsList />
//   </Container>
// </PageTemplate>
{
  /* <ContentTemplate title='Summary' headingAs='h3'>
  <Container
    as='div'
    rounded='sm'
    padding='lg'
    className='bg-slate-100'
  >
    summary
  </Container>
</ContentTemplate>
<ContentTemplate title='Shipping' headingAs='h3'>
  <Container
    as='div'
    rounded='sm'
    padding='lg'
    className='bg-slate-100'
  >
    shipping
  </Container>
</ContentTemplate> */
}

{
  /* <Container
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
    
</Container> */
}
