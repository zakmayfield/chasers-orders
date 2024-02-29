import { FC } from 'react';
import { UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import { DashboardUserData } from '@/types/types.dashboard';
import { ContactFormData } from './validator/contact.validator';
import { SaveButton } from '../Buttons';

interface ContactEditProps {
  userData: DashboardUserData;
  handleSubmit: UseFormHandleSubmit<ContactFormData, undefined>;
  register: UseFormRegister<ContactFormData>;
}

export const ContactEdit: FC<ContactEditProps> = ({
  userData,
  handleSubmit,
  register,
}) => {
  const onFormSubmit = () => {
    console.log('submitted');
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className='flex flex-col'>
      <div className='grid grid-cols-10 gap-3'>
        <label className='col-span-3 text-gray-700 flex items-center h-8'>
          Name:{' '}
        </label>
        <input
          id='contactName'
          type='text'
          placeholder={userData.contact.name}
          {...register('contactName')}
          className='col-start-5 col-span-5 placeholder:text-gray-500 bg-light-primary rounded-t h-8 pl-3 border-b'
        />

        <label className='row-start-2 col-span-4 text-gray-700 flex items-center h-8'>
          Phone number:{' '}
        </label>
        <input
          id='contactPhoneNumber'
          type='text'
          placeholder={userData.contact.phoneNumber}
          {...register('contactPhoneNumber')}
          className='col-start-5 col-span-3 placeholder:text-gray-500 bg-light-primary rounded-t h-8 pl-3 border-b'
        />

        <label className='row-start-3 col-span-4 text-gray-700 flex items-center h-8'>
          Position:{' '}
        </label>
        <input
          id='contactPosition'
          type='text'
          placeholder={
            userData.contact.position ? userData.contact.position : 'optional'
          }
          {...register('contactPosition')}
          className='col-start-5 col-span-3 placeholder:text-gray-500 bg-light-primary rounded-t h-8 pl-3 border-b'
        />

        <SaveButton />
      </div>
    </form>
  );
};
