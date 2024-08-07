'use client';

import { useQuery } from '@tanstack/react-query';
import { getRecentOrders } from '@/services/queries/getRecentOrders';
import RecentOrdersHeader from './components/RecentOrdersHeader';
import RecentOrdersContent from './components/RecentOrdersContent';
import { OrderType } from '@/types/cart';

const RecentOrders = () => {
  const { data: orders, isLoading } = useQuery<OrderType[]>({
    queryKey: ['recent-orders'],
    queryFn: getRecentOrders,
    staleTime: Infinity,
  });

  return (
    <div>
      <RecentOrdersHeader isLoading={isLoading} orderCount={orders?.length} />
      <RecentOrdersContent />
    </div>
  );
};

export default RecentOrders;
