'use client';
import { FC, useState } from 'react';
import { ContactEdit } from './ContactEdit';
import { DetailBody } from './DetailBody';
import { contactResolver } from '@/shared/validators/resolvers';
import { useCustomForm } from '@/shared/hooks/custom';
import { ContactFormData, UserData } from '@/types/user';

interface ContactDetailsProps {
  userData: UserData;
}

export const ContactDetails: FC<ContactDetailsProps> = ({ userData }) => {
  const [isEdit, setIsEdit] = useState(false);

  const { methods } = useCustomForm<ContactFormData>({
    defaultValues: {
      name: userData.contact.name,
      phoneNumber: userData.contact.phoneNumber,
      position: (userData.contact.position && userData.contact.position) || '',
    },
    resolver: contactResolver,
  });

  function handleSwitchEditCallback() {
    setIsEdit(false);
  }

  return (
    <div className='grid grid-cols-8 gap-3'>
      <div className='col-span-2 border-r p-6 h-full'>
        <p className='border-b inline-block text-lg text-gray-700'>Contact</p>
      </div>

      <div className='col-span-6 py-6 px-6'>
        {isEdit ? (
          <ContactEdit
            userData={userData}
            methods={methods}
            handleSwitchEditCallback={handleSwitchEditCallback}
            setIsEdit={setIsEdit}
          />
        ) : (
          <DetailBody
            userData={userData}
            setIsEdit={setIsEdit}
            isEdit={isEdit}
          />
        )}
      </div>
    </div>
  );
};
