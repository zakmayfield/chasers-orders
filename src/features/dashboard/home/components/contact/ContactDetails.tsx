import { FC, useState } from 'react';
import { DashboardUserData } from '@/types/types.dashboard';
import { EditButton, SaveButton } from '../Buttons';
import { ContactEdit } from './ContactEdit';
import { DetailBody } from './DetailBody';

interface ContactDetailsProps {
  userData: DashboardUserData;
}

export const ContactDetails: FC<ContactDetailsProps> = ({ userData }) => {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className='grid grid-cols-8 gap-3'>
      <div className='col-span-2 border-r p-6 h-full'>
        <p className='border-b inline-block text-lg text-gray-700'>Contact</p>
      </div>

      <div className='col-span-6 py-6 px-6'>
        {isEdit ? (
          <ContactEdit userData={userData} />
        ) : (
          <DetailBody userData={userData} setIsEdit={setIsEdit} />
        )}
      </div>

      {isEdit ? (
        <SaveButton isEdit={isEdit} setIsEdit={setIsEdit} />
      ) : (
        <EditButton isEdit={isEdit} setIsEdit={setIsEdit} />
      )}
    </div>
  );
};
