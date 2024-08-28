'use client';
import { Dispatch, FC, SetStateAction } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { UseFormReturn } from 'react-hook-form';
import { ContactValidator } from '@/shared/validators/user/ContactValidator';
import { useCustomMutation } from '@/shared/hooks/custom';
import { useToast } from '@/shared/hooks/utils';
import { updateContact } from '@/services/mutations/updateContact';
import { UserData } from '@/types/user';
import { QueryKeys } from '@/shared/types/Cache';
import { Contact } from '@prisma/client';
import { WarningCircleIcon, XBoldIcon } from '@/shared/utils/ui';
import { ContactFormData } from '@/shared/types/Forms';

interface ContactEditProps {
  userData: UserData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  methods: UseFormReturn<ContactFormData, any, undefined>;
  handleSwitchEditCallback: () => void;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
}

export const ContactEdit: FC<ContactEditProps> = ({
  userData,
  methods: {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isDirty },
  },
  handleSwitchEditCallback,
  setIsEdit,
}) => {
  const queryClient = useQueryClient();
  const { notify } = useToast();

  const { mutate: edit } = useCustomMutation<Contact, ContactFormData>({
    mutationFn: updateContact,
    handleSuccess(data) {
      notify('Succesfully updated contact information');

      queryClient.setQueryData(
        [QueryKeys.DASHBOARD],
        (oldData: UserData | undefined) => {
          return oldData ? { ...oldData, contact: data } : oldData;
        }
      );

      reset(
        {
          name: data.name,
          phoneNumber: data.phoneNumber,
          position: data.position,
        },
        {
          keepDirty: false,
        }
      );

      handleSwitchEditCallback();
    },
    handleError(error) {
      notify(error.message, 'error');
    },
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

  function resetFormOnCancel() {
    const defaultValues = {
      name: userData.contact.name,
      phoneNumber: userData.contact.phoneNumber,
      position: (userData.contact.position && userData.contact.position) || '',
    };
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
          {errors.name && <WarningCircleIcon />}
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
          {errors.phoneNumber && <WarningCircleIcon />}
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
          {errors.position && <WarningCircleIcon />}
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
                <XBoldIcon />
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
              <XBoldIcon />
            </button>
          )}
        </div>
      </div>
    </form>
  );
};
