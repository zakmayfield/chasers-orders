'use client';

import { ShippingDetails, SummaryDetails, OrderButton } from './components';

export const CartOrderSummary = () => {
  return (
    <div className='grid grid-cols-3 gap-4'>
      <SummaryDetails />
      <ShippingDetails />
      <OrderButton />
    </div>
  );
};
