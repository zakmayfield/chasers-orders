'use client';

import { FC, useState } from 'react';
import Link from 'next/link';
import { useUserStatusQuery } from './helpers.account-pending';
import { LoadingSpinner } from '@/shared/components';
import { useSendVerificationEmail } from '@/features/verify/helpers.verify';
import { useToast } from '@/hooks/general.hooks';

interface AccountPendingProps {
  isApproved: boolean;
}

const AccountPending: FC<AccountPendingProps> = () => {
  const { notify } = useToast();
  const [hasRequestedNewEmail, setHasRequestedNewEmail] = useState(false);
  const { status, isLoading } = useUserStatusQuery({});

  const { send } = useSendVerificationEmail({
    onSuccessCallback(data) {
      notify(data.responseMessage);
    },
    onErrorCallback(error) {
      notify(error.message, 'error');
    },
  });

  function handleSend() {
    setHasRequestedNewEmail(true);
    send();
  }

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
              <button
                onClick={() => handleSend()}
                disabled={hasRequestedNewEmail}
                className={`border rounded-lg py-2 px-4 ${hasRequestedNewEmail && 'text-gray-500 bg-slate-50'}`}
              >
                request a new verification email
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPending;
