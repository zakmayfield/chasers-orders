'use client';

import { FC } from 'react';
import { useUserStatusQuery } from './helpers.account-pending';
import Link from 'next/link';

interface AccountPendingProps {
  isApproved: boolean;
}

const AccountPending: FC<AccountPendingProps> = () => {
  const { status, isLoading } = useUserStatusQuery({});
  return (
    <div>
      <div>
        <h2>Account status</h2>

        <div>
          <h3>
            Your account is{' '}
            <span className='text-2xl'>
              {status?.isApproved ? 'approved' : 'pending approval'}
            </span>
          </h3>

          <p className='flex items-center gap-1'>
            Visit the
            <span>
              {status?.isApproved ? (
                <Link href='/products' className='underline text-purple-800'>
                  shop
                </Link>
              ) : (
                <Link href='/dashboard' className='underline text-purple-800'>
                  dashboard
                </Link>
              )}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccountPending;
