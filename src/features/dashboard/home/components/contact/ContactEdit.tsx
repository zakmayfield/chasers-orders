import { Dispatch, FC, SetStateAction, useEffect } from 'react';
import {
  FieldErrors,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
} from 'react-hook-form';
import { DashboardUserData } from '@/types/types.dashboard';
import {
  ContactFormData,
  ContactValidator,
} from './validator/contact.validator';
import { CancelButton, SaveButton } from '../Buttons';
import { useDashboardEdit } from '@/hooks/mutation.hooks';
import { useToast } from '@/hooks/general.hooks';
import { PiWarningCircle, PiWarningCircleDuotone } from 'react-icons/pi';

interface ContactEditProps {
  userData: DashboardUserData;
  errors: FieldErrors<ContactFormData>;
  isDirty: boolean;
  handleSubmit: UseFormHandleSubmit<ContactFormData, undefined>;
  register: UseFormRegister<ContactFormData>;
  getValues: UseFormGetValues<ContactFormData>;
  handleSwitchEditCallback: () => void;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  reset: UseFormReset<ContactFormData>;
}

export const ContactEdit: FC<ContactEditProps> = ({
  userData,
  errors,
  isDirty,
  handleSubmit,
  register,
  getValues,
  handleSwitchEditCallback,
  setIsEdit,
  reset,
}) => {
  const { edit, isSuccess } = useDashboardEdit({
    handleSwitchEditCallback,
    handleResetFormCB,
  });
  const { notify } = useToast();

  const onFormSubmit = () => {
    console.log('submitted');
    const formValues = getValues();
    // if validated: run `edit(formValues)`
    try {
      ContactValidator.parse(formValues);
      edit(formValues);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        notify(error.message, 'error');
      }
      return;
    }
  };

  type AdjustedContactFormType = {
    name: string;
    position: string;
    phoneNumber: string;
  };

  function handleResetFormCB(data: ContactFormData) {
    reset(data, {
      keepDirty: false,
    });
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className='flex flex-col'>
      <div className='grid grid-cols-10 gap-3'>
        <label className='col-span-3 text-gray-700 flex items-center h-8'>
          Name:
        </label>
        <span className='col-start-4 flex items-center justify-end text-2xl text-red-500'>
          {errors.name && <PiWarningCircleDuotone />}
        </span>
        <input
          id='name'
          type='text'
          placeholder={userData.contact.name}
          {...register('name')}
          className='col-start-5 col-span-5 placeholder:text-gray-500 bg-light-primary rounded-t h-8 pl-3 border-b'
        />

        <label className='row-start-2 col-span-3 text-gray-700 flex items-center h-8'>
          Phone number:{' '}
        </label>
        <span className='col-start-4 flex items-center justify-end text-2xl text-red-500'>
          {errors.phoneNumber && <PiWarningCircleDuotone />}
        </span>
        <input
          id='phoneNumber'
          type='text'
          placeholder={userData.contact.phoneNumber}
          {...register('phoneNumber')}
          className='col-start-5 col-span-3 placeholder:text-gray-500 bg-light-primary rounded-t h-8 pl-3 border-b'
        />

        <label className='row-start-3 col-span-3 text-gray-700 flex items-center h-8'>
          Position:{' '}
        </label>
        <span className='col-start-4 flex items-center justify-end text-2xl text-red-500'>
          {errors.position && <PiWarningCircleDuotone />}
        </span>
        <input
          id='position'
          type='text'
          placeholder={
            userData.contact.position ? userData.contact.position : 'optional'
          }
          {...register('position')}
          className='col-start-5 col-span-3 placeholder:text-gray-500 bg-light-primary rounded-t h-8 pl-3 border-b'
        />

        {!isDirty ? <CancelButton setIsEdit={setIsEdit} /> : <SaveButton />}
      </div>
    </form>
  );
};
