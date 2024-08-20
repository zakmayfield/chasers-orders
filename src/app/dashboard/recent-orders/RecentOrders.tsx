'use client';

import { RecentOrdersHeader, RecentOrdersContent } from './components';
import { useGetRecentOrders } from '@/shared/hooks/data';

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
