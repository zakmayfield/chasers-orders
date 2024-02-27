import { useQuery } from '@tanstack/react-query';
import { OrderType } from '../RecentOrders';
import { getRecentOrders } from '@/services/queries/orders.getRecentOrders';
import RecentOrdersSkeleton from './RecentOrdersSkeleton';
import RecentOrder from './RecentOrder';

function RecentOrdersContent() {
  const {
    data: orders,
    error,
    isLoading,
  } = useQuery<OrderType[]>({
    queryKey: ['recent-orders'],
    queryFn: getRecentOrders,
    staleTime: Infinity,
  });

  if (isLoading) {
    return <RecentOrdersSkeleton />;
  }

  if (error && error instanceof Error) {
    return <div>{error.message}</div>;
  }

  if (orders && orders.length === 0) {
    return <p>No recent orders</p>;
  }

  return (
    <div className='flex flex-col gap-12'>
      {orders &&
        orders.map((order) => <RecentOrder key={order.id} order={order} />)}
    </div>
  );
}

export default RecentOrdersContent;
