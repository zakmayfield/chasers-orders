import { FC, useState } from 'react';
import { DashboardUserData } from '@/types/types.dashboard';
import { ContactEdit } from './ContactEdit';
import { DetailBody } from './DetailBody';
import {
  ContactFormData,
  resolver,
  getDefaultValues,
} from './validator/contact.validator';
import { useForm } from 'react-hook-form';

interface ContactDetailsProps {
  userData: DashboardUserData;
}

export const ContactDetails: FC<ContactDetailsProps> = ({ userData }) => {
  const [isEdit, setIsEdit] = useState(false);

  // EDIT FORM STUFF
  const {
    formState: { errors, isValid },
    register,
    handleSubmit,
  } = useForm<ContactFormData>({
    resolver,
    defaultValues: getDefaultValues(userData),
  });
  // end of edit stuff

  return (
    <div className='grid grid-cols-8 gap-3'>
      <div className='col-span-2 border-r p-6 h-full'>
        <p className='border-b inline-block text-lg text-gray-700'>Contact</p>
      </div>

      <div className='col-span-6 py-6 px-6'>
        {isEdit ? (
          <ContactEdit
            userData={userData}
            handleSubmit={handleSubmit}
            register={register}
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
