'use client';

import { FC } from 'react';
import Link from 'next/link';
import { LoadingSpinner } from '@/shared/components';
import { useCustomQuery } from '@/shared/hooks/queries';
import { QueryKeys } from '@/types/hooks';
import { getUserStatus } from '@/services/queries/getUserStatus';
import { UserStatusAPIResponse } from '@/types/dashboard';
import { ResendVerification } from '@/features/verify/components';

interface AccountPendingProps {
  isApproved: boolean;
}

const AccountPending: FC<AccountPendingProps> = () => {
  const { data: status, isLoading } = useCustomQuery<UserStatusAPIResponse>({
    queryKey: [QueryKeys.USER_STATUS],
    queryFn: getUserStatus,
  });

  if (isLoading) {
    return (
      <div className='flex items-center justify-center'>
        <LoadingSpinner />
      </div>
    );
  }

  if (!status) {
    return (
      <div className='flex items-center justify-center'>
        <p>Could not locate account at this time.</p>
      </div>
    );
  }

  return (
    <div className='min-h-[35rem]'>
      <h2 className='mb-6 inline-block'>Account status</h2>
      <div className='flex flex-col gap-6'>
        <div>
          <h3>
            Your account is{' '}
            <span
              className={`text-2xl ${status.isApproved ? 'text-light-green-500' : 'text-red-400'}`}
            >
              {status.isApproved ? 'approved' : 'pending approval'}
            </span>
          </h3>

          <p className='flex items-center gap-1'>
            Visit the{' '}
            <span>
              {!status.isApproved || !status.emailVerified ? (
                <Link href='/dashboard' className='underline text-purple-800'>
                  dashboard
                </Link>
              ) : (
                <Link href='/products' className='underline text-purple-800'>
                  shop
                </Link>
              )}
            </span>
          </p>
        </div>

        <div>
          <h3>
            Your email is{' '}
            <span
              className={`text-2xl ${status.emailVerified ? 'text-light-green-500' : 'text-red-400'}`}
            >
              {status.emailVerified ? 'verified' : 'pending verification'}
            </span>
          </h3>

          <div className='mt-3'>
            {status.emailVerified ? (
              <p>
                Verified on: {new Date(status.emailVerified).toDateString()}
              </p>
            ) : (
              <ResendVerification />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPending;
