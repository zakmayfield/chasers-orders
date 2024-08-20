'use client';

import { Heading, LoadingSpinner } from '@/shared/components/ui';
import { RecentOrdersContent } from './RecentOrdersContent';
import { useGetRecentOrders } from '@/shared/hooks/data';

const RecentOrders = () => {
  const { data, isLoading } = useGetRecentOrders();

  return (
    <div>
      {/* Recent Orders Header */}
      <div className='flex items-center mb-6 gap-3'>
        <Heading as='h2' content='Recent Orders' />
        {isLoading ? <LoadingSpinner /> : <span>({data?.length})</span>}
      </div>

      {/* Recent Orders Data */}
      <RecentOrdersContent />
    </div>
  );
};

export default RecentOrders;
