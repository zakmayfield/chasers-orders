import RecentOrdersSkeleton from './RecentOrdersSkeleton';
import RecentOrder from './RecentOrder';
import { useGetRecentOrders } from '@/shared/hooks/data';

function RecentOrdersContent() {
  const { data, isLoading, error } = useGetRecentOrders();

  if (isLoading) {
    return <RecentOrdersSkeleton />;
  }

  if (error && error instanceof Error) {
    return <div>{error.message}</div>;
  }

  if (data && data.length === 0) {
    return <p>No recent orders</p>;
  }

  return (
    <div className='flex flex-col gap-12'>
      {data &&
        data.map((order) => <RecentOrder key={order.id} order={order} />)}
    </div>
  );
}

export default RecentOrdersContent;
