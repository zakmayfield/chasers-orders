'use client';
import { ShippingDetails, SummaryDetails, OrderButton } from './index';

export const OrderSummary = () => {
  return (
    <div className='col-start-8 col-span-3'>
      <div className='grid grid-cols-3 gap-4'>
        {/* Order Summary */}
        <SummaryDetails />

        {/* Shipping Details */}
        <ShippingDetails />

        {/* Order button */}
        <OrderButton />
      </div>
    </div>
  );
};
