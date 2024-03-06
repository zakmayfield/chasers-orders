'use client';

import { CartItems } from './CartItems';
import { CartOrderSummary } from './CartOrderSummary';

export const Cart = () => {
  return (
    <div className='grid grid-cols-12 gap-4'>
      <ItemsLayout>
        <CartItems />
      </ItemsLayout>

      <SummaryLayout>
        <CartOrderSummary />
      </SummaryLayout>
    </div>
  );
};

function ItemsLayout({ children }: { children: React.ReactNode }) {
  return <div className='col-start-3 col-span-4'>{children}</div>;
}

function SummaryLayout({ children }: { children: React.ReactNode }) {
  return <div className='col-start-8 col-span-3'>{children}</div>;
}
