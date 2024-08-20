'use client';
import Link from 'next/link';
import { useGetUserStatus } from '@/shared/hooks/data';
import { SendVerificationEmail } from '@/shared/components/buttons';
import { AccountPendingLoading } from './AccountPendingLoading';

export const AccountPendingData = () => {
  const { data: status, isLoading } = useGetUserStatus();

  return (
    <div>
      {isLoading ? (
        <AccountPendingLoading />
      ) : (
        <div className='flex flex-col gap-6'>
          {/* Account Approval Data */}
          <div>
            <p className='text-2xl flex items-center gap-2'>
              Your account is{' '}
              <span
                className={`text-2xl ${status?.isApproved ? 'text-light-green-500' : 'text-red-400'}`}
              >
                {status?.isApproved ? 'approved' : 'pending approval'}
              </span>
            </p>

            <p className='flex items-center gap-1'>
              Visit the{' '}
              <span>
                {!status?.isApproved || !status?.emailVerified ? (
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

          {/* Email Verification Data */}
          <div>
            <p className='text-2xl flex items-center gap-2'>
              Your email is{' '}
              <span
                className={`text-2xl ${status?.emailVerified ? 'text-light-green-500' : 'text-red-400'}`}
              >
                {status?.emailVerified ? 'verified' : 'pending verification'}
              </span>
            </p>

            <div>
              {status?.emailVerified ? (
                <p>
                  Verified on: {new Date(status?.emailVerified).toDateString()}
                </p>
              ) : (
                <SendVerificationEmail />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
