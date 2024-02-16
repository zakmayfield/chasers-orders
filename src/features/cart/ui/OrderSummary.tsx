'use client';

import GridContainer from '@/features/ui/layout/GridContainer';
import SummaryDetails from './SummaryDetail';
import OrderButton from './OrderButton';
import ShippingDetails from './ShippingDetails';

const OrderSummary = () => {
  return (
    <div className='col-start-8 col-span-3'>
      <GridContainer cols={3}>
        {/* Order Summary */}
        <SummaryDetails />

        {/* Shipping Details */}
        <ShippingDetails />

        {/* Order button */}
        <OrderButton />
      </GridContainer>
    </div>
  );
};

export default OrderSummary;
