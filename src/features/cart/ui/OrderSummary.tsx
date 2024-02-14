import Link from 'next/link';
import GridContainer from '@/features/ui/layout/GridContainer';
import SummaryDetails from './SumaryDetails';

const OrderSummary = () => {
  return (
    <div className='col-start-8 col-span-3'>
      <GridContainer cols={3}>
        <SummaryDetails />

        {/* Order button */}
        <Link
          href='/cart/order'
          className='col-start-2 col-span-2 text-center border rounded-lg py-2'
        >
          Confirm Order
        </Link>
      </GridContainer>
    </div>
  );
};

export default OrderSummary;
