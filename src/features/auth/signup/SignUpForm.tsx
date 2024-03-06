import { Dispatch, FC, SetStateAction } from 'react';
import { UseFormGetValues } from 'react-hook-form';
import { IoIosReturnRight } from 'react-icons/io';
import { ImSpinner2 } from 'react-icons/im';
import {
  Steps,
  requiredStepFields,
  signUpWithCredentials,
  useBillingAddressSync,
  handleStepChange,
  useSignUpForm,
} from './helpers.signup';
import { useToast } from '@/hooks/general.hooks';
import { SignUpFormData } from '../types/index';
import FieldError from '../components/FieldError';
import { paymentMethodOptions } from '@/utils/paymentMethods';
import { useQueryClient } from '@tanstack/react-query';
import LoadingSpinner from '@/features/shared/LoadingSpinner';

interface SignUpFormProps {
  setStep: Dispatch<SetStateAction<Steps>>;
  step: Steps;
}

const SignUpForm: FC<SignUpFormProps> = ({ setStep, step }) => {
  const queryClient = useQueryClient();

  const {
    getValues,
    setValue,
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useSignUpForm();

  const { isChecked, handleCheckbox } = useBillingAddressSync({
    getValues,
    setValue,
  });

  function handleStepChangeCallback() {
    handleStepChange({ step, setStep });
  }

  async function signupCallback(data: SignUpFormData) {
    const { isSuccess } = await signUpWithCredentials(data);

    if (isSuccess) {
      queryClient.removeQueries(['form-values']);
    }
  }

  return (
    <form onSubmit={handleSubmit(signupCallback)}>
      {!step && (
        <div className='w-full flex justify-center items-center'>
          <ImSpinner2 className='animate-spin' />
        </div>
      )}
      <div className='flex flex-col gap-24'>
        {/* STEP ONE */}
        {step === '1' && (
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
              {errors.password && (
                <FieldError message={errors.password.message} />
              )}

              <NextStepButton
                content='contact'
                step={step}
                getValues={getValues}
                handleStepChange={handleStepChangeCallback}
              />
            </div>
          </div>
        )}

        {/* STEP TWO */}
        {step === '2' && (
          <div>
            <div className='grid grid-cols-6 gap-4'>
              <label htmlFor='contactName' className='col-span-6'>
                Delivery Contact's Name:
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
                Contact's Position{' '}
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
                Contact's Phone Number
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

              <NextStepButton
                content='contact'
                step={step}
                getValues={getValues}
                handleStepChange={handleStepChangeCallback}
              />
            </div>
          </div>
        )}

        {/* STEP THREE */}
        {step === '3' && (
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
                content='contact'
                step={step}
                getValues={getValues}
                handleStepChange={handleStepChangeCallback}
              />
            </div>
          </div>
        )}

        {/* STEP four*/}
        {step === '4' && (
          <div>
            <div className='grid grid-cols-6 gap-4'>
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
                Unit{' '}
                <span className='text-gray-400 font-light'>(Optional)</span>:
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
                <label
                  htmlFor='shippingState'
                  className='row-start-1 col-span-4'
                >
                  Province:
                </label>
                <input
                  type='shippingState'
                  id='shippingState'
                  placeholder='ON'
                  {...register('shippingState')}
                  className='row-start-2 col-span-4 border-2 rounded-lg p-2 text-lg placeholder:text-gray-300 focus:ring-4 focus:ring-blue-400'
                />
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
                  type='shippingPostalCode'
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
                Delivery Instructions:
              </label>
              <textarea
                id='deliveryInstructions'
                placeholder='Deliver to side door...'
                {...register('deliveryInstructions')}
                className='border-2 rounded-lg col-span-6 p-2 text-lg placeholder:text-gray-300 focus:ring-4 focus:ring-blue-400'
              />
              {errors.deliveryInstructions && (
                <FieldError message={errors.deliveryInstructions.message} />
              )}

              {/* Same as Billing */}
              <div className='col-span-full flex items-center gap-4 mb-6 mt-3'>
                <input
                  type='checkbox'
                  id='sameAsBilling'
                  name='sameAsBilling'
                  checked={isChecked}
                  onChange={handleCheckbox}
                />
                <label htmlFor='sameAsBilling'>
                  Use same address for billing?
                </label>
              </div>

              {/* BILLING */}
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
                <label
                  htmlFor='billingState'
                  className='row-start-1 col-span-4'
                >
                  Billing Province:
                </label>
                <input
                  type='billingState'
                  id='billingState'
                  placeholder='ON'
                  {...register('billingState')}
                  className='row-start-2 col-span-4 border-2 rounded-lg p-2 text-lg placeholder:text-gray-300 focus:ring-4 focus:ring-blue-400'
                />
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

              <FinalSubmitButton isSubmitted={isSubmitted} />
            </div>
          </div>
        )}
      </div>
    </form>
  );
};

export default SignUpForm;

function FinalSubmitButton({ isSubmitted }: { isSubmitted: boolean }) {
  return (
    <button
      type='submit'
      className={`
        border-2 rounded-lg mt-6 col-span-6 p-2
        flex items-center justify-center gap-3
        focus:ring-4 focus:ring-blue-400 bg-light-greenish/70
      `}
    >
      {isSubmitted ? <LoadingSpinner /> : 'Create Account'}
    </button>
  );
}

function NextStepButton({
  content,
  step,
  getValues,
  handleStepChange,
}: {
  content: string;
  step: Steps;
  getValues: UseFormGetValues<SignUpFormData>;
  handleStepChange(): void;
}) {
  const queryClient = useQueryClient();
  const { notify } = useToast();

  function isStepComplete(currentStep: Steps) {
    const formValues = getValues();
    const requiredFields = requiredStepFields[currentStep];
    return requiredFields.every((field) => !!formValues[field]);
  }

  const handleNextStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    function handleNotComplete() {
      // set focus when submitting an incomplete form to the first item in the required arr if not empty
      notify('Please complete all required fields', 'info');
    }

    function handleComplete() {
      // define current form state
      const formValues = getValues();
      // spread all values except for password
      const { password, ...secureFormValues } = formValues;
      // set form state to cache
      queryClient.setQueryData(['form-values'], secureFormValues);

      // evoke callback from parent
      handleStepChange();
    }

    isStepComplete(step) ? handleComplete() : handleNotComplete();
  };

  return (
    <button
      onClick={handleNextStep}
      className={`mt-6 active:shadow-inner col-start-4 col-span-3 border-2 flex items-center justify-center gap-3 p-2 rounded-lg focus:ring-4 focus:ring-blue-400`}
    >
      <span>{content}</span>
      <span>
        <IoIosReturnRight />
      </span>
    </button>
  );
}
