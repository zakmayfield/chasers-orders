'use client';
import { Dispatch, FC, SetStateAction } from 'react';
import {
  FieldErrors,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
  UseFormSetFocus,
} from 'react-hook-form';
import { DashboardUserData } from '@/types/types.dashboard';
import {
  ContactFormData,
  ContactValidator,
  getDefaultValues,
} from './validator/contact.validator';
import { useDashboardEdit } from '@/shared/hooks/mutation.hooks';
import { useToast } from '@/shared/hooks/general.hooks';
import { PiWarningCircleDuotone, PiXBold } from 'react-icons/pi';

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
  setFocus: UseFormSetFocus<ContactFormData>;
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
  const { notify } = useToast();

  const { edit } = useDashboardEdit({
    handleSwitchEditCallback,
    handleResetFormCB,
  });

  const onFormSubmit = () => {
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

  function handleResetFormCB(data: ContactFormData) {
    reset(data, {
      keepDirty: false,
    });
  }

  function resetFormOnCancel() {
    const defaultValues = getDefaultValues(userData);
    setIsEdit(false);
    reset(defaultValues);
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

        {/* BUTTONs */}
        <div className='col-start-9 col-span-2'>
          {isDirty && (
            <div className='flex items-center gap-1 h-full'>
              <button
                onClick={resetFormOnCancel}
                className='w-1/3 h-full ml-auto rounded-lg bg-red-300 text-white hover:ring-2 hover:ring-sky-500 flex items-center justify-center'
              >
                <PiXBold />
              </button>
              <button className='w-2/3 h-full rounded-lg bg-light-green-400 text-white hover:ring-2 hover:ring-sky-500'>
                save
              </button>
            </div>
          )}
          {!isDirty && (
            <button
              onClick={() => setIsEdit(false)}
              className='col-span-1 w-1/2 h-full ml-auto rounded-lg bg-red-300 text-white hover:ring-2 hover:ring-sky-500 flex items-center justify-center'
            >
              <PiXBold />
            </button>
          )}
        </div>
      </div>
    </form>
  );
};
