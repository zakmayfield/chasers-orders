'use client';
import Link from 'next/link';
import { useGetAuthorization } from '@/shared/hooks/data';
import { SendVerificationEmail } from '@/shared/components/buttons';
import { AccountPendingLoading } from './AccountPendingLoading';

export const AccountPendingData = () => {
  const { data: status, isLoading } = useGetAuthorization();

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
                className={`text-2xl ${status?.is_approved ? 'text-light-green-500' : 'text-red-400'}`}
              >
                {status?.is_approved ? 'approved' : 'pending approval'}
              </span>
            </p>

            <p className='flex items-center gap-1'>
              Visit the{' '}
              <span>
                {!status?.is_approved || !status?.email_verified_on ? (
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
                className={`text-2xl ${status?.email_verified_on ? 'text-light-green-500' : 'text-red-400'}`}
              >
                {status?.email_verified_on
                  ? 'verified'
                  : 'pending verification'}
              </span>
            </p>

            <div>
              {status?.email_verified_on ? (
                <p>
                  Verified on:{' '}
                  {new Date(status?.email_verified_on).toDateString()}
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
