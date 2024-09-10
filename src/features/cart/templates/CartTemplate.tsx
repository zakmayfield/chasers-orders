'use client';
import { CartItemsList } from '../organisms/CartItemsList';
import { OrderSummary } from '../organisms/OrderSummary';
import { Shipping } from '../organisms/Shipping';
import { PlaceOrder } from '../organisms/PlaceOrder';
import { ContentWrapper, Layout } from '@/shared/components/containers';

export const CartTemplate = () => {
  return (
    <Layout heading='h1' title='Cart' contentFlex='col'>
      <CartItemsList />

      <ContentWrapper flex='col'>
        <OrderSummary />
        {/* <Shipping /> */}
        <PlaceOrder />
      </ContentWrapper>
    </Layout>
  );
};
