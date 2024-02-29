import { FC, useState } from 'react';
import Link from 'next/link';
import { DashboardUserData } from '@/types/types.dashboard';
import DetailBody from './DetailBody';
import { CompanyEdit } from './CompanyEdit';
import {
  CompanyFormData,
  resolver,
  getDefaultValues,
} from './validator/company.validator';
import { useForm } from 'react-hook-form';

interface CompanyDetailsProps {
  userData: DashboardUserData;
}

export const CompanyDetails: FC<CompanyDetailsProps> = ({ userData }) => {
  const [isEdit, setIsEdit] = useState(false);

  // EDIT FORM STUFF
  const {
    formState: { errors, isValid },
    register,
    handleSubmit,
  } = useForm<CompanyFormData>({
    resolver,
    defaultValues: getDefaultValues(userData),
  });
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
