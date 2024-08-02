'use client';
import { FC, useState } from 'react';
import { UserData } from '@/types/user';
import { ContactEdit } from './ContactEdit';
import { DetailBody } from './DetailBody';
import {
  ContactFormData,
  resolver,
  getDefaultValues,
} from '@/shared/validators/UpdateContactFormValidator';
import { useForm } from 'react-hook-form';

interface ContactDetailsProps {
  userData: UserData;
}

export const ContactDetails: FC<ContactDetailsProps> = ({ userData }) => {
  const [isEdit, setIsEdit] = useState(false);

  // EDIT FORM STUFF
  const {
    formState: { errors, isDirty },
    register,
    handleSubmit,
    getValues,
    reset,
    setFocus,
  } = useForm<ContactFormData>({
    resolver,
    defaultValues: getDefaultValues(userData),
  });

  function handleSwitchEditCallback() {
    setIsEdit(false);
  }
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
            getValues={getValues}
            errors={errors}
            handleSwitchEditCallback={handleSwitchEditCallback}
            isDirty={isDirty}
            setIsEdit={setIsEdit}
            reset={reset}
            setFocus={setFocus}
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
