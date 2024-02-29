import { FC } from 'react';
import Link from 'next/link';
import { DashboardUserData } from '@/types/types.dashboard';

interface RecentOrderDetailsProps {
  userData: DashboardUserData;
}

const RecentOrderDetails: FC<RecentOrderDetailsProps> = ({ userData }) => {
  const lastOrderCreatedAt =
    userData &&
    userData.orders.length !== 0 &&
    new Date(userData.orders[0].createdAt);
  return (
    <div className='grid grid-cols-8 gap-3'>
      <div className='col-span-2 border-r p-6 h-full'>
        <p className='border-b inline-block text-lg text-gray-700'>
          Recent Orders
        </p>
      </div>

      <div className='col-span-6 pt-6 mx-6'>
        <div className='grid grid-cols-10 gap-3'>
          <div className='col-span-10'>
            {userData.orders.length !== 0 ? (
              <span>
                {lastOrderCreatedAt && lastOrderCreatedAt.toLocaleDateString()}
              </span>
            ) : (
              <span>
                first time?{' '}
                <Link href='/products' className='underline text-purple-800'>
                  visit our shop
                </Link>{' '}
                to get started
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentOrderDetails;
