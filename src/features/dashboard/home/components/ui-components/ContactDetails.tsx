import { FC } from 'react';
import Link from 'next/link';
import { DashboardUserData } from '@/types/types.dashboard';
import { ContactEdit } from '../form-components';

interface ContactDetailsProps {
  userData: DashboardUserData;
}

export const ContactDetails: FC<ContactDetailsProps> = ({ userData }) => {
  return (
    <div className='grid grid-cols-8 gap-3'>
      <div className='col-span-2 border-r p-6 h-full'>
        <p className='border-b inline-block text-lg text-gray-700'>Contact</p>
      </div>

      <div className='col-span-6 py-6 px-6'>
        <div className='flex flex-col'>
          <div className='grid grid-cols-10 gap-3'>
            <span className='col-span-3 text-gray-700'>Name: </span>
            <span className='col-start-5 col-span-6'>
              {userData.contact.name}
            </span>

            <span className='row-start-2 col-span-4 text-gray-700'>
              Phone number:{' '}
            </span>
            <span className='row-start-2 col-start-5 col-span-6'>
              {userData.contact.phoneNumber}
            </span>

            <span className='row-start-3 col-span-4 text-gray-700'>
              Position:{' '}
            </span>
            <span className='row-start-3 col-start-5 col-span-6'>
              {userData.contact.position ? (
                userData.contact.position
              ) : (
                <Link href='/dashboard' className='underline text-purple-900'>
                  add position
                </Link>
              )}
            </span>
          </div>
        </div>
      </div>

      <Link
        href='/dashboard'
        className='underline text-purple-800 col-start-7 text-center'
      >
        edit
      </Link>
    </div>
  );
};
