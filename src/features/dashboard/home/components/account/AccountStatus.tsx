import { DashboardUserData } from '@/types/types.dashboard';
import { FC } from 'react';

interface AccountStatusProps {
  userData: DashboardUserData;
}

export const AccountStatus: FC<AccountStatusProps> = ({ userData }) => {
  const emailVerifiedDateString =
    userData && userData.emailVerified && new Date(userData.emailVerified);

  return (
    <div className='grid grid-cols-8 gap-3'>
      <div className='col-span-2 border-r p-6'>
        <p className='border-b inline-block text-lg text-gray-700'>
          Account Status
        </p>
      </div>

      <div className='col-span-6 p-6'>
        <div className='grid grid-cols-10 gap-3'>
          <span className='col-span-3 text-gray-700'>Email: </span>
          <span className='col-start-5 col-span-6 '>{userData.email}</span>

          <span className='row-start-2 col-span-3 text-gray-700'>
            Email verification:{' '}
          </span>
          <span className='row-start-2 col-start-5 col-span-6 text-gray-500 text-sm italic'>
            Verified on {emailVerifiedDateString?.toLocaleDateString()}
          </span>

          <span className='col-span-3 text-gray-700'>Account approval: </span>
          <span className='col-start-5 col-span-6'>
            {userData.isApproved ? '🟢' : '🔴'}
          </span>
        </div>
      </div>
    </div>
  );
};
