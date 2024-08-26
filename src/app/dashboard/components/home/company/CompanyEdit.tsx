'use client';
import { Dispatch, FC, SetStateAction } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { UseFormReturn } from 'react-hook-form';
import { CompanyValidator } from '@/shared/validators/user/CompanyValidator';
import { useCustomMutation } from '@/shared/hooks/custom';
import { useToast } from '@/shared/hooks/utils';
import { paymentMethodOptions } from '@/utils/constants';
import { updateCompany } from '@/services/mutations/updateCompany';
import { CompanyFormData, UserData } from '@/types/user';
import { QueryKeys } from '@/types/hooks';
import { Company } from '@prisma/client';
import { WarningCircleIcon, XBoldIcon } from '@/shared/utils/ui';

interface CompanyEditProps {
  userData: UserData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  methods: UseFormReturn<CompanyFormData, any, undefined>;
  handleSwitchEditCallback: () => void;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
}

export const CompanyEdit: FC<CompanyEditProps> = ({
  userData,
  methods: {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors, isDirty },
  },
  setIsEdit,
  handleSwitchEditCallback,
}) => {
  const queryClient = useQueryClient();
  const { notify } = useToast();
  const { mutate: edit } = useCustomMutation<Company, CompanyFormData>({
    mutationFn: updateCompany,
    handleSuccess(data) {
      notify('Successfully updated company');

      queryClient.setQueryData(
        [QueryKeys.DASHBOARD],
        (oldData: UserData | undefined) => {
          return oldData
            ? { ...oldData, company: { ...oldData.company, ...data } }
            : oldData;
        }
      );

      reset(
        {
          name: data.name,
          accountPayableEmail: data.accountPayableEmail,
          paymentMethod: data.paymentMethod,
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

    try {
      CompanyValidator.parse(formValues);

      if (
        !formValues.accountPayableEmail ||
        formValues.accountPayableEmail === ''
      ) {
        setValue('accountPayableEmail', 'N/A');
      }

      const newValues = getValues();

      edit(newValues);
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
      name: userData.company.name,
      accountPayableEmail: userData.company.accountPayableEmail,
      paymentMethod: userData.company.paymentMethod,
    };
    setIsEdit(false);
    reset(defaultValues);
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className='flex flex-col'>
      <div className='grid grid-cols-10 gap-3'>
        <label className='col-span-3 text-gray-700 flex items-center h-8'>
          Name:{' '}
        </label>
        <span className='col-start-4 flex items-center justify-end text-2xl text-red-500'>
          {errors.name && <WarningCircleIcon />}
        </span>
        <input
          id='name'
          type='text'
          placeholder={userData.company.name}
          {...register('name')}
          className='col-start-5 col-span-5 placeholder:text-gray-500 bg-light-primary rounded-t h-8 pl-3 border-b'
        />

        <label className='row-start-2 col-span-3 text-gray-700 flex items-center h-8'>
          Account payable email:{' '}
        </label>
        <span className='col-start-4 flex items-center justify-end text-2xl text-red-500'>
          {errors.accountPayableEmail && <WarningCircleIcon />}
        </span>
        <input
          id='accountPayableEmail'
          type='text'
          placeholder={userData.company.accountPayableEmail}
          {...register('accountPayableEmail')}
          className='col-start-5 col-span-5 placeholder:text-gray-500 bg-light-primary rounded-t h-8 pl-3 border-b'
        />

        <label className='row-start-3 col-span-3 text-gray-700 flex items-center h-8'>
          Payment method:{' '}
        </label>
        <span className='col-start-4 flex items-center justify-end text-2xl text-red-500'>
          {errors.paymentMethod && <WarningCircleIcon />}
        </span>
        <select
          id='paymentMethod'
          {...register('paymentMethod')}
          className='col-start-5 col-span-3 placeholder:text-gray-500 bg-light-primary rounded-t pl-3 h-8 border-b'
        >
          <option value={userData.company.paymentMethod}>
            {userData.company.paymentMethod}
          </option>
          {paymentMethodOptions.methods.map(
            (method) =>
              method.value !== userData.company.paymentMethod && (
                <option key={method.key}>{method.value}</option>
              )
          )}
        </select>

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
