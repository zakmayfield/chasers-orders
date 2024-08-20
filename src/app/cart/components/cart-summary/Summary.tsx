'use client';
import { SummaryItems } from './summary-items';
import { Shipping } from './shipping';
import { OrderButton } from './order-button';
import { Heading } from '@/shared/components/ui';

export const Summary = () => {
  return (
    <div className='col-start-8 col-span-4 flex flex-col gap-3'>
      <Heading as='h4' content='Order Summary' />

      <div className='grid grid-cols-3'>
        <SummaryItems />
        <Shipping />
        <OrderButton />
      </div>
    </div>
  );
};
