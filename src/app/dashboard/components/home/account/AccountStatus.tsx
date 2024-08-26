'use client';

import { FC } from 'react';
import type { UserData } from '@/types/user';
import { CheckIcon, XIcon } from '@/shared/utils/ui';

interface AccountStatusProps {
  userData: UserData;
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

          {userData.emailVerified ? (
            <div className='row-start-2 col-start-5 col-span-6 text-gray-400 text-sm italic flex items-center gap-3'>
              <CheckIcon className='text-2xl text-light-green-500' />
              <p className='text-gray-400 text-small italic'>
                Verified on {emailVerifiedDateString?.toLocaleDateString()}
              </p>
            </div>
          ) : (
            <div className='row-start-2 col-start-5 col-span-6 text-gray-400 text-sm italic flex items-center gap-3'>
              <XIcon className='text-2xl text-red-500' />
              <p className='text-gray-400 text-small italic'>
                pending verification
              </p>
            </div>
          )}

          <span className='col-span-3 text-gray-700'>Account status: </span>
          {userData.isApproved ? (
            <div className='col-start-5 col-span-6 flex items-center gap-3'>
              <CheckIcon className='text-2xl text-light-green-500' />
              <p className='text-gray-400 text-small italic'>approved</p>
            </div>
          ) : (
            <div className='col-start-5 col-span-6 flex items-center gap-3'>
              <XIcon className='text-2xl text-red-500' />
              <p className='text-gray-400 text-small italic'>
                pending approval
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
