'use client';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import {
  UseFormGetFieldState,
  UseFormGetValues,
  useForm,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { SignUpFormData } from '@/types/types.auth-forms';
import { AuthSignUpValidator } from '@/lib/validators/validator.auth-form';
import GridContainer from '../ui/layout/GridContainer';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { IoIosReturnRight } from 'react-icons/io';
import { useEffect, useRef, useState } from 'react';
import { ImSpinner2 } from 'react-icons/im';
import { useToast } from '@/hooks/general.hooks';

type Steps = '1' | '2' | '3' | '4';
const defaultValues = {
  email: '',
  password: '',
  contactName: '',
  contactPosition: '',
  contactPhoneNumber: '',
  companyName: '',
  accountPayableEmail: '',
  paymentMethod: '',
  shippingStreetAddress: '',
  shippingUnit: '',
  shippingCity: '',
  shippingState: '',
  shippingPostalCode: '',
  deliveryInstructions: '',
  billingStreetAddress: '',
  billingUnit: '',
  billingCity: '',
  billingState: '',
  billingPostalCode: '',
};

export default function SignUp() {
  const queryClient = useQueryClient();

  const {
    formState: { errors, isDirty, isValid },
    handleSubmit,
    register,
    getValues,
    getFieldState,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(AuthSignUpValidator),
    defaultValues,
  });

  const credentialSignUp = async (data: SignUpFormData) => {
    try {
      await signIn('sign-up', {
        ...data,
      });
    } catch (err) {
      console.error(err);
    } finally {
    }
  };

  const [step, setStep] = useState<Steps>();
  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current) {
      setStep('1');
    }

    hasRun.current = true;
  }, []);

  // TODO: Caching is not complete
  function nextStepCallback() {
    // Increment step
    let stepToNumber = Number(step);
    if (stepToNumber >= 4) {
      return;
    }
    const nextStep = (stepToNumber = stepToNumber + 1);

    setStep(nextStep.toString() as Steps);
  }

  return (
    <div className='border col-start-5 col-span-4 py-6 px-12 font-extralight'>
      <h2 className='font-light text-2xl mb-12'>Sign Up</h2>

      {/* STEPS */}
      <SignUpStepTracker activeStep={step} />

      <form onSubmit={handleSubmit(credentialSignUp)}>
        <div className='flex flex-col gap-24'>
          {/* "LOAD" STEP SKELETON*/}
          {!step && (
            <div className='w-full flex justify-center items-center'>
              <ImSpinner2 className='animate-spin' />
            </div>
          )}

          {/* STEP ONE */}
          {step === '1' && (
            <div>
              <GridContainer cols={6}>
                <label htmlFor='email' className='col-span-6'>
                  Email:
                </label>
                <input
                  type='email'
                  id='email'
                  {...register('email')}
                  className='border-2 rounded col-span-6 p-2 font-extralight text-lg'
                />
                {errors.email && <p role='alert'>{errors.email?.message}</p>}

                <label htmlFor='password' className='col-span-6'>
                  Password:
                </label>
                <input
                  type='password'
                  id='password'
                  {...register('password')}
                  className='border-2 rounded col-span-6 p-2 font-extralight text-lg'
                />
                {errors.password && (
                  <p role='alert'>{errors.password?.message}</p>
                )}

                <NextStepButton
                  content='contact'
                  step={step}
                  isDirty={isDirty}
                  getValues={getValues}
                  getFieldState={getFieldState}
                  nextStepCallback={nextStepCallback}
                />
              </GridContainer>
            </div>
          )}

          {/* STEP TWO */}
          {/* {step === '2' && (
            <div>
              <GridContainer cols={6}>
                <label htmlFor='contactName' className='col-span-6'>
                  Contact Name:
                </label>
                <input
                  type='contactName'
                  id='contactName'
                  {...register('contactName')}
                  className='border-2 rounded col-span-6 p-2 font-extralight text-lg'
                />
                {errors.contactName && (
                  <p role='alert'>{errors.contactName?.message}</p>
                )}

                <label htmlFor='contactPosition' className='col-span-6'>
                  Contact Position:
                </label>
                <input
                  type='contactPosition'
                  id='contactPosition'
                  {...register('contactPosition')}
                  className='border-2 rounded col-span-6 p-2 font-extralight text-lg'
                />
                {errors.contactPosition && (
                  <p role='alert'>{errors.contactPosition?.message}</p>
                )}

                <label htmlFor='contactPhoneNumber' className='col-span-6'>
                  Contact Phone Number:
                </label>
                <input
                  type='contactPhoneNumber'
                  id='contactPhoneNumber'
                  {...register('contactPhoneNumber')}
                  className='border-2 rounded col-span-6 p-2 font-extralight text-lg'
                />
                {errors.contactPhoneNumber && (
                  <p role='alert'>{errors.contactPhoneNumber?.message}</p>
                )}

                <NextStepButton
                  content='company'
                  nextStepCallback={nextStepCallback}
                  disabled={() => isStepButtonDisabled('2')}
                />
              </GridContainer>
            </div>
          )} */}

          {/* STEP THREE */}
          {/* {step === '3' && (
            <div>
              <GridContainer cols={6}>
                <label htmlFor='companyName' className='col-span-6'>
                  Company Name:
                </label>
                <input
                  type='companyName'
                  id='companyName'
                  {...register('companyName')}
                  className='border-2 rounded col-span-6 p-2 font-extralight text-lg'
                />
                {errors.companyName && (
                  <p role='alert'>{errors.companyName?.message}</p>
                )}

                <label htmlFor='accountPayableEmail' className='col-span-6'>
                  Account Payable Email:
                </label>
                <input
                  type='accountPayableEmail'
                  id='accountPayableEmail'
                  {...register('accountPayableEmail')}
                  className='border-2 rounded col-span-6 p-2 font-extralight text-lg'
                />
                {errors.accountPayableEmail && (
                  <p role='alert'>{errors.accountPayableEmail?.message}</p>
                )}

                <label htmlFor='paymentMethod' className='col-span-6'>
                  Payment Method:
                </label>
                <input
                  type='paymentMethod'
                  id='paymentMethod'
                  {...register('paymentMethod')}
                  className='border-2 rounded col-span-6 p-2 font-extralight text-lg'
                />
                {errors.paymentMethod && (
                  <p role='alert'>{errors.paymentMethod?.message}</p>
                )}
                <NextStepButton
                  content='shipping'
                  nextStepCallback={nextStepCallback}
                  disabled={() => isStepButtonDisabled('3')}
                />
              </GridContainer>
            </div>
          )} */}

          {/* STEP four*/}
          {/* {step === '4' && (
            <div>
              <GridContainer cols={6}>
                <label htmlFor='shippingStreetAddress' className='col-span-6'>
                  Shipping Address (optional):
                </label>
                <input
                  type='shippingStreetAddress'
                  id='shippingStreetAddress'
                  {...register('shippingStreetAddress')}
                  className='border-2 rounded col-span-6 p-2 font-extralight text-lg'
                />
                {errors.shippingStreetAddress && (
                  <p role='alert'>{errors.shippingStreetAddress?.message}</p>
                )}

                <label htmlFor='shippingUnit' className='col-span-6'>
                  Shipping Unit:
                </label>
                <input
                  type='shippingUnit'
                  id='shippingUnit'
                  {...register('shippingUnit')}
                  className='border-2 rounded col-span-6 p-2 font-extralight text-lg'
                />
                {errors.shippingUnit && (
                  <p role='alert'>{errors.shippingUnit?.message}</p>
                )}

                <label htmlFor='shippingCity' className='col-span-6'>
                  Shipping City:
                </label>
                <input
                  type='shippingCity'
                  id='shippingCity'
                  {...register('shippingCity')}
                  className='border-2 rounded col-span-6 p-2 font-extralight text-lg'
                />
                {errors.shippingCity && (
                  <p role='alert'>{errors.shippingCity?.message}</p>
                )}

                <label htmlFor='shippingState' className='col-span-6'>
                  Shipping State:
                </label>
                <input
                  type='shippingState'
                  id='shippingState'
                  {...register('shippingState')}
                  className='border-2 rounded col-span-6 p-2 font-extralight text-lg'
                />
                {errors.shippingState && (
                  <p role='alert'>{errors.shippingState?.message}</p>
                )}

                <label htmlFor='shippingPostalCode' className='col-span-6'>
                  Shipping Postal Code:
                </label>
                <input
                  type='shippingPostalCode'
                  id='shippingPostalCode'
                  {...register('shippingPostalCode')}
                  className='border-2 rounded col-span-6 p-2 font-extralight text-lg'
                />
                {errors.shippingPostalCode && (
                  <p role='alert'>{errors.shippingPostalCode?.message}</p>
                )}

                <label htmlFor='deliveryInstructions' className='col-span-6'>
                  Delivery Instructions:
                </label>
                <input
                  type='deliveryInstructions'
                  id='deliveryInstructions'
                  {...register('deliveryInstructions')}
                  className='border-2 rounded col-span-6 p-2 font-extralight text-lg'
                />
                {errors.deliveryInstructions && (
                  <p role='alert'>{errors.deliveryInstructions?.message}</p>
                )}

                <label htmlFor='billingStreetAddress' className='col-span-6'>
                  Billing Address:
                </label>
                <input
                  type='billingStreetAddress'
                  id='billingStreetAddress'
                  {...register('billingStreetAddress')}
                  className='border-2 rounded col-span-6 p-2 font-extralight text-lg'
                />
                {errors.billingStreetAddress && (
                  <p role='alert'>{errors.billingStreetAddress?.message}</p>
                )}

                <label htmlFor='billingUnit' className='col-span-6'>
                  Billing Unit:
                </label>
                <input
                  type='billingUnit'
                  id='billingUnit'
                  {...register('billingUnit')}
                  className='border-2 rounded col-span-6 p-2 font-extralight text-lg'
                />
                {errors.billingUnit && (
                  <p role='alert'>{errors.billingUnit?.message}</p>
                )}

                <label htmlFor='billingCity' className='col-span-6'>
                  Billing City:
                </label>
                <input
                  type='billingCity'
                  id='billingCity'
                  {...register('billingCity')}
                  className='border-2 rounded col-span-6 p-2 font-extralight text-lg'
                />
                {errors.billingCity && (
                  <p role='alert'>{errors.billingCity?.message}</p>
                )}

                <label htmlFor='billingState' className='col-span-6'>
                  Billing State:
                </label>
                <input
                  type='billingState'
                  id='billingState'
                  {...register('billingState')}
                  className='border-2 rounded col-span-6 p-2 font-extralight text-lg'
                />
                {errors.billingState && (
                  <p role='alert'>{errors.billingState?.message}</p>
                )}

                <label htmlFor='billingPostalCode' className='col-span-6'>
                  Billing Postal Code:
                </label>
                <input
                  type='billingPostalCode'
                  id='billingPostalCode'
                  {...register('billingPostalCode')}
                  className='border-2 rounded col-span-6 p-2 font-extralight text-lg'
                />
                {errors.billingPostalCode && (
                  <p role='alert'>{errors.billingPostalCode?.message}</p>
                )}

                <FinalSubmitButton />
              </GridContainer>
            </div>
          )} */}
        </div>
      </form>

      <div className='text-center mt-12'>
        <p>
          Prefer to sign in?{' '}
          <Link href='/' className='underline'>
            Sign In Here
          </Link>
        </p>
      </div>
    </div>
  );
}

function SignUpStepTracker({ activeStep }: { activeStep: Steps | undefined }) {
  if (!activeStep) {
    return (
      <div className='text-center text-sm tracking-wide flex items-center justify-center gap-3 mb-12'>
        <span>credentials</span> <span className='text-lg'>/</span>
        <span>contact</span> <span className='text-lg'>/</span>
        <span>company</span> <span className='text-lg'>/</span>
        <span>shipping</span>
      </div>
    );
  }

  return (
    <div className='text-center text-sm tracking-wide flex items-center justify-center gap-3 mb-12'>
      <span
        className={`${activeStep === '1' ? 'text-green-500 font-normal' : 'text-slate-600'} ${activeStep > '1' && 'text-opacity-30'}`}
      >
        credentials
      </span>{' '}
      <span className={`text-lg'}`}>/</span>
      <span
        className={`${activeStep === '2' ? 'text-green-500 font-normal' : 'text-slate-600'} ${activeStep > '2' && 'text-opacity-30'}`}
      >
        contact
      </span>{' '}
      <span className={`text-lg`}>/</span>
      <span
        className={`${activeStep === '3' ? 'text-green-500 font-normal' : 'text-slate-600'} ${activeStep > '3' && 'text-opacity-30'}`}
      >
        company
      </span>{' '}
      <span className={`text-lg`}>/</span>
      <span
        className={`${activeStep === '4' ? 'text-green-500 font-normal' : 'text-slate-600'}`}
      >
        shipping
      </span>
    </div>
  );
}

function FinalSubmitButton() {
  return (
    <button
      type='submit'
      onClick={() => {}}
      className='col-span-6 border-2 flex items-center justify-center gap-3 p-2 rounded-lg mt-12'
    >
      Create Account
    </button>
  );
}

// TODO: Prevent NextStepButton from triggering if fields are not complete
function NextStepButton({
  content,
  step,
  isDirty,
  getValues,
  nextStepCallback,
  getFieldState,
}: {
  content: string;
  step: Steps;
  isDirty: boolean;
  getValues: UseFormGetValues<SignUpFormData>;
  nextStepCallback: () => void;
  getFieldState: UseFormGetFieldState<SignUpFormData>;
}) {
  const { notify } = useToast();
  const [isDisabled, setIsDisabled] = useState(true);

  type Key =
    | 'email'
    | 'password'
    | 'contactName'
    | 'contactPosition'
    | 'contactPhoneNumber'
    | 'companyName'
    | 'accountPayableEmail'
    | 'paymentMethod'
    | 'shippingStreetAddress'
    | 'shippingUnit'
    | 'shippingCity'
    | 'shippingState'
    | 'shippingPostalCode'
    | 'deliveryInstructions'
    | 'billingStreetAddress'
    | 'billingUnit'
    | 'billingCity'
    | 'billingState'
    | 'billingPostalCode';

  interface IRequiredFields {
    [step: string]: Key[];
  }

  const requiredFields: IRequiredFields = {
    '1': ['email', 'password'],
    '2': ['contactName', 'contactPosition', 'contactPhoneNumber'],
    '3': ['companyName', 'paymentMethod', 'accountPayableEmail'],
    '4': [
      'shippingStreetAddress',
      'shippingCity',
      'shippingState',
      'shippingPostalCode',
    ],
  };

  function isStepComplete(currentStep: Steps) {
    const formValues = getValues();

    // define required fields via the current step
    const required = requiredFields[currentStep];

    return required.every((field) => !!formValues[field]);
  }

  const handleNextStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    function handleNotComplete() {
      // set focus when submitting an incomplete form to the first item in the required arr if not empty
      notify('Please complete all required fields', 'info');
    }

    isStepComplete(step) ? nextStepCallback() : handleNotComplete();
  };

  return (
    <button
      onClick={(e) => handleNextStep(e)}
      className={`active:shadow-inner col-start-4 col-span-3 border-2 flex items-center justify-center gap-3 p-2 rounded-lg`}
    >
      <span>{content}</span>
      <span>
        <IoIosReturnRight />
      </span>
    </button>
  );
}
