'use client';

import GridContainer from '@/features/ui/layout/GridContainer';
import SummaryDetails from './SumaryDetails';
import OrderButton from './OrderButton';

const OrderSummary = () => {
  return (
    <div className='col-start-8 col-span-3'>
      <GridContainer cols={3}>
        <SummaryDetails />

        {/* Order button */}
        <OrderButton />
      </GridContainer>
    </div>
  );
};

export default OrderSummary;
