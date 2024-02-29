import { FC } from 'react';
import { DashboardUserData } from '@/types/types.dashboard';

interface DetailBodyProps {
  userData: DashboardUserData;
}

const DetailBody: FC<DetailBodyProps> = ({ userData }) => {
  return (
    <div className='flex flex-col'>
      <div className='grid grid-cols-10 gap-3'>
        <span className='col-span-4 text-gray-700 flex items-center h-8'>
          Name:{' '}
        </span>
        <span className='col-start-5 col-span-6 flex items-center h-8'>
          {userData.company.name}
        </span>

        <span className='row-start-2 col-span-4 text-gray-700 flex items-center h-8'>
          Account payable email:{' '}
        </span>
        <span className='row-start-2 col-start-5 col-span-6 flex items-center h-8'>
          {userData.company.accountPayableEmail}
        </span>

        <span className='row-start-3 col-span-4 text-gray-700 flex items-center h-8'>
          Payment method:{' '}
        </span>
        <span className='row-start-3 col-start-5 col-span-6 flex items-center h-8'>
          {userData.company.paymentMethod}
        </span>
      </div>
    </div>
  );
};

export default DetailBody;
