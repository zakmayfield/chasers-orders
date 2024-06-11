import { FC } from 'react';
import FieldError from '@/features/auth/components/FieldError';
import { useBillingAddressSync } from '@/features/auth/signup/helpers.signup';
import {
  FinalStepButton,
  PreviousStepButton,
} from '@/features/auth/signup/components/buttons';
import { provinceOptions } from '@/shared/constants';
import type { StepFourProps } from '@/features/auth/types';

export const StepFour: FC<StepFourProps> = ({
  register,
  getValues,
  setValue,
  handlePreviousStepCallback,
  step,
  errors,
  isSubmitted,
  isSubmitSuccessful,
}) => {
  const { isChecked, handleCheckbox } = useBillingAddressSync({
    getValues,
    setValue,
  });
  return (
    <div>
      <div className='grid grid-cols-6 gap-4'>
        {/*//^ SHIPPING */}
        <label htmlFor='shippingStreetAddress' className='col-span-6'>
          Address:
        </label>
        <input
          type='shippingStreetAddress'
          id='shippingStreetAddress'
          placeholder='123 Main St'
          {...register('shippingStreetAddress')}
          className='border-2 rounded-lg col-span-6 p-2 text-lg placeholder:text-gray-300 focus:ring-4 focus:ring-blue-400'
        />
        {errors.shippingStreetAddress && (
          <FieldError message={errors.shippingStreetAddress.message} />
        )}

        <label htmlFor='shippingUnit' className='col-span-6'>
          Unit <span className='text-gray-400 font-light'>(Optional)</span>:
        </label>
        <input
          type='shippingUnit'
          id='shippingUnit'
          placeholder='Optional'
          {...register('shippingUnit')}
          className='border-2 rounded-lg col-span-6 p-2 text-lg bg-slate-50 bg-opacity-60 placeholder:text-gray-300 focus:ring-4 focus:ring-green-300'
        />
        {errors.shippingUnit && (
          <FieldError message={errors.shippingUnit.message} />
        )}

        <label htmlFor='shippingCity' className='col-span-6'>
          City:
        </label>
        <input
          type='shippingCity'
          id='shippingCity'
          placeholder='Toronto'
          {...register('shippingCity')}
          className='col-span-6 border-2 rounded-lg p-2 text-lg placeholder:text-gray-300 focus:ring-4 focus:ring-blue-400'
        />
        {errors.shippingCity && (
          <FieldError message={errors.shippingCity.message} />
        )}

        <div className='col-span-full grid grid-cols-12 gap-4'>
          <label htmlFor='shippingState' className='row-start-1 col-span-4'>
            Province:
          </label>
          <select
            id='shippingState'
            className='row-start-2 col-span-4 border-2 rounded-lg p-2 text-lg placeholder:text-gray-300 focus:ring-4 focus:ring-blue-400'
            {...register('shippingState')}
          >
            <option value=''>{provinceOptions.default}</option>
            {provinceOptions.options.map((province) => (
              <option key={province}>{province}</option>
            ))}
          </select>
          {errors.shippingState && (
            <FieldError message={errors.shippingState.message} />
          )}

          <label
            htmlFor='shippingPostalCode'
            className='row-start-1 col-start-6 col-span-6'
          >
            Postal Code:
          </label>
          <input
            id='shippingPostalCode'
            placeholder='X2X 2X2'
            {...register('shippingPostalCode')}
            className='row-start-2 col-start-6 col-span-6 border-2 rounded-lg p-2 text-lg placeholder:text-gray-300 focus:ring-4 focus:ring-blue-400'
          />
          {errors.shippingPostalCode && (
            <FieldError message={errors.shippingPostalCode.message} />
          )}
        </div>

        <label htmlFor='deliveryInstructions' className='col-span-6'>
          Delivery Instructions{' '}
          <span className='text-gray-400'>(Optional)</span>:
        </label>
        <textarea
          id='deliveryInstructions'
          placeholder='Deliver to side door...'
          {...register('deliveryInstructions')}
          className='border-2 bg-light-primary rounded-lg col-span-6 p-2 text-lg placeholder:text-gray-300 focus:ring-4 focus:ring-blue-400'
        />
        {errors.deliveryInstructions && (
          <FieldError message={errors.deliveryInstructions.message} />
        )}

        {/*//^ Same as Billing */}
        <div className='col-span-full flex items-center gap-4 mb-6 mt-3'>
          <input
            type='checkbox'
            id='sameAsBilling'
            name='sameAsBilling'
            checked={isChecked}
            onChange={handleCheckbox}
          />
          <label htmlFor='sameAsBilling'>Use same address for billing?</label>
        </div>

        {/*//^ BILLING */}
        <label htmlFor='billingStreetAddress' className='col-span-6'>
          Billing Address:
        </label>
        <input
          type='billingStreetAddress'
          id='billingStreetAddress'
          placeholder='123 Main St'
          {...register('billingStreetAddress')}
          className='border-2 rounded-lg col-span-6 p-2 text-lg placeholder:text-gray-300 focus:ring-4 focus:ring-blue-400'
        />
        {errors.billingStreetAddress && (
          <FieldError message={errors.billingStreetAddress.message} />
        )}

        <label htmlFor='billingUnit' className='col-span-6'>
          Billing Unit{' '}
          <span className='text-gray-400 font-light'>(Optional)</span>:
        </label>
        <input
          type='billingUnit'
          id='billingUnit'
          {...register('billingUnit')}
          placeholder='Optional'
          className='border-2 rounded-lg col-span-6 p-2 text-lg bg-gray-50 bg-opacity-60 placeholder:text-gray-300 focus:ring-4 focus:ring-green-300'
        />
        {errors.billingUnit && (
          <FieldError message={errors.billingUnit.message} />
        )}

        <label htmlFor='billingCity' className='col-span-6'>
          Billing City:
        </label>
        <input
          type='billingCity'
          id='billingCity'
          placeholder='Toronto'
          {...register('billingCity')}
          className='border-2 rounded-lg col-span-6 p-2 text-lg placeholder:text-gray-300 focus:ring-4 focus:ring-blue-400'
        />
        {errors.billingCity && (
          <FieldError message={errors.billingCity.message} />
        )}

        <div className='col-span-full grid grid-cols-12 gap-4'>
          <label htmlFor='billingState' className='row-start-1 col-span-4'>
            Billing Province:
          </label>
          <select
            id='billingState'
            className='row-start-2 col-span-4 border-2 rounded-lg p-2 text-lg placeholder:text-gray-300 focus:ring-4 focus:ring-blue-400'
            {...register('billingState')}
          >
            <option value=''>{provinceOptions.default}</option>
            {provinceOptions.options.map((province) => (
              <option key={province}>{province}</option>
            ))}
          </select>
          {errors.billingState && (
            <FieldError message={errors.billingState.message} />
          )}

          <label
            htmlFor='billingPostalCode'
            className='row-start-1 col-start-6 col-span-6'
          >
            Billing Postal Code:
          </label>
          <input
            type='billingPostalCode'
            id='billingPostalCode'
            placeholder='X2X 2X2'
            {...register('billingPostalCode')}
            className='row-start-2 col-start-6 col-span-6 border-2 rounded-lg p-2 text-lg placeholder:text-gray-300 focus:ring-4 focus:ring-blue-400'
          />
          {errors.billingPostalCode && (
            <FieldError message={errors.billingPostalCode.message} />
          )}
        </div>

        <PreviousStepButton
          step={step}
          handlePreviousStepCallback={handlePreviousStepCallback}
        />

        <FinalStepButton
          isSubmitted={isSubmitted}
          isSubmitSuccessful={isSubmitSuccessful}
        />
      </div>
    </div>
  );
};
