'use client';
import { SummaryItems } from './summary-items';
import { Shipping } from './shipping';
import { OrderButton } from './order-button';

export const Summary = () => {
  return (
    <div className='col-start-8 col-span-4'>
      <Title />

      <div className='grid grid-cols-3'>
        <SummaryItems />
        <Shipping />
        <OrderButton />
      </div>
    </div>
  );
};

function Title() {
  return <h4 className='col-span-3 mb-6'>Order Summary</h4>;
}
