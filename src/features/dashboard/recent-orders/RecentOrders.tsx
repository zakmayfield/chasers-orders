'use client';

import { Order, OrderLineItem } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { getRecentOrders } from '@/services/queries/orders.getRecentOrders';
import RecentOrdersHeader from './components/RecentOrdersHeader';
import RecentOrdersContent from './components/RecentOrdersContent';

export type OrderType = Order & {
  lineItems: OrderLineItem[];
};

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
