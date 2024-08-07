import { FC } from 'react';
import FieldError from '@/features/auth/components/FieldError';
import {
  NextStepButton,
  PreviousStepButton,
} from '@/features/auth/signup/components/buttons';
import type { StepProps } from '@/types/auth';

export const StepTwo: FC<StepProps> = ({
  register,
  getValues,
  handleStepChangeCallback,
  handlePreviousStepCallback,
  errors,
  step,
}) => {
  return (
    <div>
      <div className='grid grid-cols-6 gap-4'>
        <label htmlFor='contactName' className='col-span-6'>
          Delivery Contact&apos;s Name:
        </label>
        <input
          type='contactName'
          id='contactName'
          placeholder='John'
          {...register('contactName')}
          className='border-2 rounded-lg col-span-6 p-2 text-lg placeholder:text-gray-300 focus:ring-4 focus:ring-blue-400'
        />
        {errors.contactName && (
          <FieldError message={errors.contactName.message} />
        )}

        <label htmlFor='contactPosition' className='col-span-6'>
          Contact&apos;s Position{' '}
          <span className='text-gray-400 font-light'>(Optional)</span>:
        </label>
        <input
          type='contactPosition'
          id='contactPosition'
          placeholder='Optional'
          {...register('contactPosition')}
          className='border-2 rounded-lg col-span-6 p-2 text-lg placeholder:text-gray-300 bg-slate-50 bg-opacity-60 focus:ring-4 focus:ring-green-300'
        />
        {errors.contactPosition && (
          <FieldError message={errors.contactPosition.message} />
        )}

        <label htmlFor='contactPhoneNumber' className='col-span-6'>
          Contact&apos;s Phone Number
        </label>
        <input
          type='contactPhoneNumber'
          id='contactPhoneNumber'
          placeholder='8412238765'
          {...register('contactPhoneNumber')}
          className='border-2 rounded-lg col-span-6 p-2 text-lg placeholder:text-gray-300 focus:ring-4 focus:ring-blue-400'
        />
        {errors.contactPhoneNumber && (
          <FieldError message={errors.contactPhoneNumber.message} />
        )}

        <PreviousStepButton
          step={step}
          handlePreviousStepCallback={handlePreviousStepCallback}
        />

        <NextStepButton
          step={step}
          getValues={getValues}
          handleStepChange={handleStepChangeCallback}
        />
      </div>
    </div>
  );
};
