import { FC, useState } from 'react';
import Link from 'next/link';
import { DashboardUserData } from '@/types/types.dashboard';
import DetailBody from './DetailBody';
import { CompanyEdit } from './CompanyEdit';
import { CancelEditButton, EditButton, SaveButton } from '../Buttons';

interface CompanyDetailsProps {
  userData: DashboardUserData;
}

export const CompanyDetails: FC<CompanyDetailsProps> = ({ userData }) => {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className='grid grid-cols-8 gap-3'>
      <div className='col-span-2 border-r p-6 h-full'>
        <p className='border-b inline-block text-lg text-gray-700'>Company</p>
      </div>

      <div className='col-span-6 py-6 px-6'>
        {isEdit ? (
          <CompanyEdit userData={userData} />
        ) : (
          <DetailBody userData={userData} />
        )}
      </div>

      <div className='col-start-7'>
        {isEdit ? (
          <div className='flex items-center gap-3'>
            <SaveButton isEdit={isEdit} setIsEdit={setIsEdit} />
            <CancelEditButton isEdit={isEdit} setIsEdit={setIsEdit} />
          </div>
        ) : (
          <EditButton isEdit={isEdit} setIsEdit={setIsEdit} />
        )}
      </div>
    </div>
  );
};
