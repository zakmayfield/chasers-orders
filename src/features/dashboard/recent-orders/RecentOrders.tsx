'use client';

import RecentOrdersHeader from './components/RecentOrdersHeader';
import RecentOrdersContent from './components/RecentOrdersContent';
import { useGetRecentOrders } from '@/shared/hooks/queries';

const RecentOrders = () => {
  const { data, isLoading } = useGetRecentOrders();

  return (
    <div>
      <RecentOrdersHeader isLoading={isLoading} orderCount={data?.length} />
      <RecentOrdersContent />
    </div>
  );
};

export default RecentOrders;
