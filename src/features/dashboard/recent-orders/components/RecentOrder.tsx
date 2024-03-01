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
    <div key={order.id} className=''>
      <div className='mb-2 w-full flex items-center gap-3 '>
        <h5>{createdAtDate}</h5>
        <Link href='#' className='underline text-purple-800 text-sm'>
          order again
        </Link>
      </div>

      <div className='px-6 py-3'>
        {isLoading ? (
          <PiSpinnerGapThin className='animate-spin' />
        ) : (
          <div>
            {orderWithLineItemProducts?.lineItems.map(
              ({ quantity, unit: { product } }) => {
                return (
                  <div className='grid grid-cols-10 mb-6 w-full'>
                    <span className='col-span-1 text-sm w-full text-center text-gray-600 mr-3 font-normal underline'>
                      x{quantity}
                    </span>

                    <span className='col-start-2 col-span-full w-full'>
                      {product.name}
                    </span>

                    <span className='row-start-2 col-start-2 w-full text-sm italic text-gray-600 lowercase'>
                      {product.category}
                    </span>

                    <div
                      aria-label='style div'
                      className='h-1 w-2/3 mx-auto mt-3 rounded row-start-3 col-span-full bg-light-secondary'
                    ></div>
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
