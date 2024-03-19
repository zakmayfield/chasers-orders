'use client';

import { FC } from 'react';

interface AccountPendingProps {
  isApproved: boolean;
}

const AccountPending: FC<AccountPendingProps> = ({ isApproved }) => {
  return (
    <div>
      {/* {isApproved ? (
        <div>
          <h2>Your account is approved</h2>
          <p>
            Visit our{' '}
            <Link href='/products' className='underline'>
              Shop
            </Link>
          </p>
        </div>
      ) : (
        <div>
          <h2>Your account is pending approval</h2>
          <p>
            Visit your{' '}
            <Link href='/dashboard' className='underline'>
              Dashboard
            </Link>{' '}
            to view your account status.
          </p>
        </div>
      )} */}
    </div>
  );
};

export default AccountPending;
