import { FC } from 'react';
import FieldError from '@/features/auth/components/FieldError';
import { NextStepButton } from '@/features/auth/signup/components/buttons';
import { Steps } from '@/features/auth/signup/helpers.signup';
import type { SignUpFormData } from '@/features/auth/types';
import type {
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
} from 'react-hook-form';

interface StepOneProps {
  register: UseFormRegister<SignUpFormData>;
  getValues: UseFormGetValues<SignUpFormData>;
  handleStepChangeCallback(): void;
  errors: FieldErrors<SignUpFormData>;
  step: Steps;
}

export const StepOne: FC<StepOneProps> = ({
  register,
  getValues,
  handleStepChangeCallback,
  errors,
  step,
}) => {
  return (
    <div>
      <div className='grid grid-cols-6 gap-4'>
        <label htmlFor='email' className='col-span-6'>
          Email:
        </label>
        <input
          type='email'
          id='email'
          placeholder='email@email.com'
          {...register('email')}
          className='border-2 rounded-lg col-span-6 p-2 text-lg placeholder:text-gray-300 focus:ring-4 focus:ring-blue-400'
        />
        {errors.email && (
          <div className='col-span-6'>
            <FieldError message={errors.email.message} />
          </div>
        )}

        <label htmlFor='password' className='col-span-6'>
          Password:
        </label>
        <input
          type='password'
          id='password'
          placeholder='Password'
          {...register('password')}
          className='border-2 rounded-lg col-span-6 p-2 text-lg placeholder:text-gray-300 focus:ring-4 focus:ring-blue-400'
        />
        {errors.password && <FieldError message={errors.password.message} />}

        <NextStepButton
          step={step}
          getValues={getValues}
          handleStepChange={handleStepChangeCallback}
        />
      </div>
    </div>
  );
};
