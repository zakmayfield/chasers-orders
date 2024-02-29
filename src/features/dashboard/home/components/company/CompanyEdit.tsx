import { FC } from 'react';
import { DashboardUserData } from '@/types/types.dashboard';
import { UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import { CompanyFormData } from './validator/company.validator';
import { SaveButton } from '../Buttons';
import { useDashboardEdit } from '@/hooks/mutation.hooks';

interface CompanyEditProps {
  userData: DashboardUserData;
  handleSubmit: UseFormHandleSubmit<CompanyFormData, undefined>;
  register: UseFormRegister<CompanyFormData>;
}

export const CompanyEdit: FC<CompanyEditProps> = ({
  userData,
  handleSubmit,
  register,
}) => {
  // const { edit } = useDashboardEdit();

  const onFormSubmit = () => {
    console.log('submitted');
    // edit();
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className='flex flex-col'>
      <div className='grid grid-cols-10 gap-3'>
        <label className='col-span-3 text-gray-700 flex items-center h-8'>
          Name:{' '}
        </label>
        <input
          id='companyName'
          type='text'
          placeholder={userData.company.name}
          {...register('companyName')}
          className='col-start-5 col-span-5 placeholder:text-gray-500 bg-light-primary rounded-t h-8 pl-3 border-b'
        />

        <label className='row-start-2 col-span-4 text-gray-700 flex items-center h-8'>
          Account payable email:{' '}
        </label>
        <input
          id='accountPayableEmail'
          type='text'
          placeholder={userData.company.accountPayableEmail}
          {...register('accountPayableEmail')}
          className='col-start-5 col-span-5 placeholder:text-gray-500 bg-light-primary rounded-t h-8 pl-3 border-b'
        />

        <label className='row-start-3 col-span-4 text-gray-700 flex items-center h-8'>
          Payment method:{' '}
        </label>
        <input
          id='paymentMethod'
          type='text'
          placeholder={userData.company.paymentMethod}
          {...register('paymentMethod')}
          className='col-start-5 col-span-3 placeholder:text-gray-500 bg-light-primary rounded-t pl-3 h-8 border-b'
        />
        <SaveButton />
      </div>
    </form>
  );
};
