import { FC } from 'react';
import Link from 'next/link';
import { DashboardUserData } from '@/types/types.dashboard';

interface CompanyDetailsProps {
  userData: DashboardUserData;
}

export const CompanyDetails: FC<CompanyDetailsProps> = ({ userData }) => {
  return (
    <div className='grid grid-cols-8 gap-3'>
      <div className='col-span-2 border-r p-6 h-full'>
        <p className='border-b inline-block text-lg text-gray-700'>Company</p>
      </div>

      <div className='col-span-6 pt-6 mx-6'>
        <div className='flex flex-col'>
          <div className='grid grid-cols-10 gap-3'>
            <span className='col-span-4 text-gray-700'>Name: </span>
            <span className='col-start-5 col-span-6'>
              {userData.company.name}
            </span>

            <span className='row-start-2 col-span-4 text-gray-700'>
              Account payable email:{' '}
            </span>
            <span className='row-start-2 col-start-5 col-span-6'>
              {userData.company.accountPayableEmail}
            </span>

            <span className='row-start-3 col-span-4 text-gray-700'>
              Payment method:{' '}
            </span>
            <span className='row-start-3 col-start-5 col-span-6'>
              {userData.company.paymentMethod}
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
