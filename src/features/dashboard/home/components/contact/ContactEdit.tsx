import { FC } from 'react';
import { DashboardUserData } from '@/types/types.dashboard';

interface ContactEditProps {
  userData: DashboardUserData;
}

export const ContactEdit: FC<ContactEditProps> = ({ userData }) => {
  return (
    <form className='flex flex-col'>
      <div className='grid grid-cols-10 gap-3'>
        <label className='col-span-3 text-gray-700 flex items-center h-8'>
          Name:{' '}
        </label>
        <input
          id='contactName'
          type='text'
          placeholder={userData.contact.name}
          value={''}
          className='col-start-5 col-span-5 placeholder:text-gray-500 bg-light-primary rounded-t h-8 pl-3 border-b'
        />

        <label className='row-start-2 col-span-4 text-gray-700 flex items-center h-8'>
          Phone number:{' '}
        </label>
        <input
          id='contactPhoneNumber'
          type='text'
          placeholder={userData.contact.phoneNumber}
          value={''}
          className='col-start-5 col-span-3 placeholder:text-gray-500 bg-light-primary rounded-t h-8 pl-3 border-b'
        />

        <label className='row-start-3 col-span-4 text-gray-700 flex items-center h-8'>
          Position:{' '}
        </label>
        <input
          id='contactPosition'
          type='text'
          placeholder={
            userData.contact.position ? userData.contact.position : 'optional'
          }
          value={''}
          className='col-start-5 col-span-3 placeholder:text-gray-500 bg-light-primary rounded-t h-8 pl-3 border-b'
        />
      </div>
    </form>
  );
};
