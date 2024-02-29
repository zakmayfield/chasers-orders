import { FC } from 'react';
import { DashboardUserData } from '@/types/types.dashboard';

interface ContactEditProps {
  userData: DashboardUserData;
}

export const ContactEdit: FC<ContactEditProps> = ({ userData }) => {
  return (
    <div className='flex flex-col'>
      <div className='grid grid-cols-10 gap-3'>
        <span className='col-span-3 text-gray-700'>Name: </span>
        <span className='col-start-5 col-span-6'>{userData.contact.name}</span>

        <span className='row-start-2 col-span-4 text-gray-700'>
          Phone number:{' '}
        </span>
        <span className='row-start-2 col-start-5 col-span-6'>
          {userData.contact.phoneNumber}
        </span>

        <span className='row-start-3 col-span-4 text-gray-700'>Position: </span>
        <span className='row-start-3 col-start-5 col-span-6'>
          {userData.contact.position && userData.contact.position}
        </span>
      </div>
    </div>
  );
};
