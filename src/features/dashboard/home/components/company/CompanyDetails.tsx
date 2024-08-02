'use client';

import { FC, useState } from 'react';
import { UserData } from '@/types/user';
import DetailBody from './DetailBody';
import { CompanyEdit } from './CompanyEdit';
import {
  CompanyFormData,
  resolver,
  getDefaultValues,
} from '@/shared/validators/CompanyValidator';
import { useForm } from 'react-hook-form';

interface CompanyDetailsProps {
  userData: UserData;
}

export const CompanyDetails: FC<CompanyDetailsProps> = ({ userData }) => {
  const [isEdit, setIsEdit] = useState(false);

  // EDIT FORM STUFF
  const {
    formState: { errors, isDirty },
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
  } = useForm<CompanyFormData>({
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
        <p className='border-b inline-block text-lg text-gray-700'>Company</p>
      </div>

      <div className='col-span-6 py-6 px-6'>
        {isEdit ? (
          <CompanyEdit
            userData={userData}
            errors={errors}
            isDirty={isDirty}
            handleSubmit={handleSubmit}
            register={register}
            reset={reset}
            handleSwitchEditCallback={handleSwitchEditCallback}
            setIsEdit={setIsEdit}
            getValues={getValues}
            setValue={setValue}
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
