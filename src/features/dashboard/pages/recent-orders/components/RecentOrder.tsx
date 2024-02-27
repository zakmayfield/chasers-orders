import {
  LineItemProducts,
  fetchLineItemsFromOrderId,
} from '@/services/queries/orders.fetchLineItemsFromOrderId';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { OrderType } from '../RecentOrders';
import { PiSpinnerGapThin, PiWarningDuotone } from 'react-icons/pi';

const RecentOrder = ({ order }: { order: OrderType }) => {
  const {
    data: orderWithLineItemProducts,
    isLoading,
    error,
    isError,
  } = useQuery<LineItemProducts | null>({
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
    <div key={order.id}>
      <div className='mb-2 w-full flex items-center gap-3'>
        <h5>{createdAtDate}</h5>
        <Link href='#' className='underline text-purple-800 text-sm'>
          order again
        </Link>
      </div>

      <div className='px-6'>
        {isLoading ? (
          <PiSpinnerGapThin className='animate-spin' />
        ) : (
          <div>
            {orderWithLineItemProducts?.lineItems.map(
              ({ quantity, unit: { product } }) => {
                return (
                  <div className='flex items-center gap-6'>
                    <div>
                      <span className='text-sm text-gray-600 mr-3'>
                        x{quantity}
                      </span>
                      <span>{product.name}</span>
                    </div>
                    <span className='text-sm text-gray-600 lowercase'>
                      {product.category}
                    </span>
                  </div>
                );
              }
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentOrder;
