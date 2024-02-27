import {
  LineItemProducts,
  fetchLineItemsFromOrderId,
} from '@/services/queries/orders.fetchLineItemsFromOrderId';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { OrderType } from '../RecentOrders';

const RecentOrder = ({ order }: { order: OrderType }) => {
  const { data: orderWithLineItemProducts } = useQuery<LineItemProducts | null>(
    {
      queryKey: ['line-item-products', order.id],
      queryFn: () => fetchLineItemsFromOrderId(order.id),
      staleTime: Infinity,
    }
  );

  const createdAtDate = new Date(order.createdAt).toDateString();

  if (!orderWithLineItemProducts) {
    return <div>Could not locate order.</div>;
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
        {orderWithLineItemProducts.lineItems.map(
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
    </div>
  );
};

export default RecentOrder;
