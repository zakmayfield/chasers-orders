import { useQuery } from '@tanstack/react-query';
import { PiSpinnerGapThin, PiWarningDuotone } from 'react-icons/pi';
import {
  LineItemProducts,
  fetchLineItemsFromOrderId,
} from '@/services/queries/orders.fetchLineItemsFromOrderId';
import { OrderType } from '../RecentOrders';
import OrderAgainButton from './OrderAgainButton';
import { RecentOrderItems } from './RecentOrderItems';

const RecentOrder = ({ order }: { order: OrderType }) => {
  const {
    data: orderWithLineItems,
    isLoading,
    isError,
  } = useQuery<LineItemProducts | undefined>({
    queryKey: ['line-item-products', order.id],
    queryFn: () => fetchLineItemsFromOrderId(order.id),
    staleTime: Infinity,
  });

  const createdAtDate = new Date(order.createdAt).toDateString();

  if (isError) {
    return (
      <div>
        <p className='flex items-center gap-3'>
          <PiWarningDuotone className='text-yellow-500' />
          <span className='text-sm'>Could not locate order</span>
        </p>
      </div>
    );
  }

  return (
    <div key={order.id} className=''>
      <div className='mb-2 w-full flex items-center gap-3 '>
        <h5>{createdAtDate}</h5>
        <OrderAgainButton order={order} />
      </div>

      <div className='px-6 py-3'>
        {isLoading ? (
          <PiSpinnerGapThin className='animate-spin' />
        ) : (
          <RecentOrderItems order={orderWithLineItems} />
        )}
      </div>
    </div>
  );
};

export default RecentOrder;
