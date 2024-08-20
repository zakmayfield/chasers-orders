import { LoadingSpinner } from '@/shared/components';

export const RecentOrdersHeader = ({
  isLoading,
  orderCount,
}: {
  isLoading: boolean;
  orderCount?: number;
}) => {
  return (
    <h2 className='flex items-center mb-6 gap-3'>
      Recent Orders
      <div className='flex items-center justify-start w-10'>
        {isLoading ? <LoadingSpinner /> : <span>({orderCount})</span>}
      </div>
    </h2>
  );
};
