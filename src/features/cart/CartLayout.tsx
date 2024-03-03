'use client';

import GridContainer from '../shared/GridContainer';
import CartItemContainer from './ui/CartItemContainer';
import OrderSummary from './ui/OrderSummary';

export default function CartLayout() {
  return (
    <GridContainer cols={12}>
      {/* Review cart and edit */}
      <CartItemContainer />

      {/* Order summary */}
      <OrderSummary />
    </GridContainer>
  );
}
