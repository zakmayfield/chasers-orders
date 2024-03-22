import { FC } from 'react';
import FieldError from '@/features/auth/components/FieldError';
import { NextStepButton } from '@/features/auth/signup/components/buttons';
import { paymentMethodOptions } from '@/shared';
import type { StepProps } from '@/features/auth/types';

export const StepThree: FC<StepProps> = ({
  register,
  getValues,
  handleStepChangeCallback,
  errors,
  step,
}) => {
  return (
    <div>
      <div className='grid grid-cols-6 gap-4'>
        <label htmlFor='companyName' className='col-span-6'>
          Company Name:
        </label>
        <input
          type='companyName'
          id='companyName'
          placeholder='Acme'
          {...register('companyName')}
          className='border-2 rounded-lg col-span-6 p-2 text-lg placeholder:text-gray-300 focus:ring-4 focus:ring-blue-400'
        />
        {errors.companyName && (
          <FieldError message={errors.companyName.message} />
        )}

        <label htmlFor='accountPayableEmail' className='col-span-6'>
          Account Payable Email{' '}
          <span className='text-gray-400 text-sm'>
            (Please write N/A if not applicable)
          </span>
          :
        </label>
        <input
          type='accountPayableEmail'
          id='accountPayableEmail'
          placeholder='payable@email.com'
          {...register('accountPayableEmail')}
          className='border-2 rounded-lg col-span-6 p-2 text-lg placeholder:text-gray-300 focus:ring-4 focus:ring-blue-400'
        />
        {errors.accountPayableEmail && (
          <FieldError message={errors.accountPayableEmail.message} />
        )}

        <label htmlFor='paymentMethod' className='col-span-6'>
          Payment Method:
        </label>
        <select
          id='paymentMethod'
          {...register('paymentMethod')}
          className='border-2 rounded-lg col-span-5 p-2 text-lg focus:ring-4 focus:ring-blue-400'
        >
          <option value=''>{paymentMethodOptions.default}</option>
          {paymentMethodOptions.methods.map((method) => (
            <option key={method.key}>{method.value}</option>
          ))}
        </select>
        {errors.paymentMethod && (
          <FieldError message={errors.paymentMethod.message} />
        )}

        <NextStepButton
          step={step}
          getValues={getValues}
          handleStepChange={handleStepChangeCallback}
        />
      </div>
    </div>
  );
};
