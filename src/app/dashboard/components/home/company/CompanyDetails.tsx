'use client';
import { FC, useState } from 'react';
import { UserData } from '@/types/user';
import DetailBody from './DetailBody';
import { CompanyEdit } from './CompanyEdit';
import { companyResolver } from '@/shared/validators/resolvers';
import { useCustomForm } from '@/shared/hooks/custom';
import { CompanyFormData } from '@/shared/types/Forms';

interface CompanyDetailsProps {
  userData: UserData;
}

export const CompanyDetails: FC<CompanyDetailsProps> = ({ userData }) => {
  const [isEdit, setIsEdit] = useState(false);

  const { methods } = useCustomForm<CompanyFormData>({
    defaultValues: {
      name: userData.company.name,
      accountPayableEmail: userData.company.accountPayableEmail,
      paymentMethod: userData.company.paymentMethod,
    },
    resolver: companyResolver,
  });

  function handleSwitchEditCallback() {
    setIsEdit(false);
  }

  return (
    <div className='grid grid-cols-8 gap-3'>
      <div className='col-span-2 border-r p-6 h-full'>
        <p className='border-b inline-block text-lg text-gray-700'>Company</p>
      </div>

      <div className='col-span-6 py-6 px-6'>
        {isEdit ? (
          <CompanyEdit
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
