'use client';

import { ShippingDetails, SummaryDetails, OrderButton } from './components';

export const CartOrderSummary = () => {
  return (
    <div className='grid grid-cols-3'>
      <h4 className='col-span-3 mb-6'>Order Summary</h4>

      <SummaryDetails />
      <ShippingDetails />
      <OrderButton />
    </div>
  );
};
