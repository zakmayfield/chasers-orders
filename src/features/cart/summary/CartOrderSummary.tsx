'use client';
import { SummaryDetails } from './summary-details';
import { OrderButton } from './order-button';
import { ShippingDetails } from './shipping-details';

export const CartOrderSummary = () => {
  return (
    <div className='col-start-8 col-span-4'>
      <div className='grid grid-cols-3'>
        <h4 className='col-span-3 mb-6'>Order Summary</h4>

        <SummaryDetails />
        <ShippingDetails />
        <OrderButton />
      </div>
    </div>
  );
};
