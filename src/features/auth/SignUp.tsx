'use client';
import { signIn } from 'next-auth/react';
import {
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  useForm,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { SignUpFormData } from '@/types/types.auth-forms';
import { AuthSignUpValidator } from '@/lib/validators/validator.auth-form';
import GridContainer from '../shared/GridContainer';
import { useQueryClient } from '@tanstack/react-query';
import { IoIosReturnRight } from 'react-icons/io';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { ImSpinner2 } from 'react-icons/im';
import { useToast } from '@/hooks/general.hooks';
import FormSwitchLink from './ui/FormSwitchLink';
import FieldError from './ui/FieldError';
import { paymentMethodOptions } from '@/utils/paymentMethods';

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
  const [isChecked, setIsChecked] = useState(false);

  const {
    formState: { errors, isDirty, isValid },
    handleSubmit,
    register,
    getValues,
    setValue,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(AuthSignUpValidator),
    defaultValues,
  });

  const signUpWithCredentials = async (data: SignUpFormData) => {
    try {
      await signIn('sign-up', {
        ...data,
      });
      queryClient.removeQueries(['form-values']);
    } catch (err) {
      console.error(err);
    } finally {
    }
  };

  function signUpCallback() {
    handleSubmit(signUpWithCredentials);
  }

  const [step, setStep] = useState<Steps>('1');
  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current) {
      setStep('1');
    }

    hasRun.current = true;
  }, []);

  function nextStepCallback() {
    // Increment step
    let stepToNumber = Number(step);
    if (stepToNumber >= 4) {
      return;
    }
    const nextStep = (stepToNumber = stepToNumber + 1);

    setStep(nextStep.toString() as Steps);
  }

  function handleCheckbox(event: ChangeEvent<HTMLInputElement>) {
    const formValues = getValues();
    setIsChecked(event.target.checked);

    if (event.target.checked) {
      setValue('billingStreetAddress', formValues.shippingStreetAddress);
      setValue('billingUnit', formValues.shippingUnit);
      setValue('billingCity', formValues.shippingCity);
      setValue('billingState', formValues.shippingState);
      setValue('billingPostalCode', formValues.shippingPostalCode);
    } else {
      setValue('billingStreetAddress', '');
      setValue('billingUnit', '');
      setValue('billingCity', '');
      setValue('billingState', '');
      setValue('billingPostalCode', '');
    }
  }

  return (
    <div className='border col-start-5 col-span-4 py-6 px-12 font-extralight'>
      <h2 className='text-2xl mb-12'>Create an account</h2>

      <SignUpStepTracker activeStep={step} />
      <form onSubmit={signUpCallback}>
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
                  nextStepCallback={nextStepCallback}
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
                  nextStepCallback={nextStepCallback}
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
                  nextStepCallback={nextStepCallback}
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
                <FinalSubmitButton />
              </div>
            </div>
          )}
        </div>
      </form>
      <FormSwitchLink formType='sign-up' />
    </div>
  );
}

type SignUpFormParams = {
  signUpParams: {
    nextStepCallback: () => void;
    signUpCallback: () => void;
    register: UseFormRegister<SignUpFormData>;
    errors: FieldErrors<SignUpFormData>;
  };
  step: Steps;
};

// function SignUpForm({ signUpParams, step }: SignUpFormParams) {
//   const { signUpCallback } = signUpParams;
//   return (
//     <form onSubmit={signUpCallback}>
//       {!step && (
//         <div className='w-full flex justify-center items-center'>
//           <ImSpinner2 className='animate-spin' />
//         </div>
//       )}
//       <FormSections step={step} />
//     </form>
//   );
// }

type FormSectionsParams = {
  step: Steps;
};

// function FormSections({ step }: FormSectionsParams) {
//   const [isChecked, setIsChecked] = useState(false);

//   function handleCheckbox(event: ChangeEvent<HTMLInputElement>) {
//     setIsChecked(event.target.checked);
//   }

//   return (
//     <div className='flex flex-col gap-24'>
//       {/* STEP ONE */}
//       {step === '1' && (
//         <div>
//           <GridContainer cols={6}>
//             <label htmlFor='email' className='col-span-6'>
//               Email:
//             </label>
//             <input
//               type='email'
//               id='email'
//               placeholder='email@email.com'
//               {...register('email')}
//               className='border-2 rounded-lg col-span-6 p-2 text-lg placeholder:text-gray-300 focus:ring-4 focus:ring-blue-400'
//             />
//             {errors.email && (
//               <div className='col-span-6'>
//                 <FieldError message={errors.email.message} />
//               </div>
//             )}

//             <label htmlFor='password' className='col-span-6'>
//               Password:
//             </label>
//             <input
//               type='password'
//               id='password'
//               placeholder='Password'
//               {...register('password')}
//               className='border-2 rounded-lg col-span-6 p-2 text-lg placeholder:text-gray-300 focus:ring-4 focus:ring-blue-400'
//             />
//             {errors.password && (
//               <FieldError message={errors.password.message} />
//             )}

//             <NextStepButton
//               content='contact'
//               step={step}
//               getValues={getValues}
//               nextStepCallback={nextStepCallback}
//             />
//           </GridContainer>
//         </div>
//       )}

//       {/* STEP TWO */}
//       {step === '2' && (
//         <div>
//           <GridContainer cols={6}>
//             <label htmlFor='contactName' className='col-span-6'>
//               Delivery Contact's Name:
//             </label>
//             <input
//               type='contactName'
//               id='contactName'
//               placeholder='John'
//               {...register('contactName')}
//               className='border-2 rounded-lg col-span-6 p-2 text-lg placeholder:text-gray-300 focus:ring-4 focus:ring-blue-400'
//             />
//             {errors.contactName && (
//               <FieldError message={errors.contactName.message} />
//             )}

//             <label htmlFor='contactPosition' className='col-span-6'>
//               Contact's Position{' '}
//               <span className='text-gray-400 font-light'>(Optional)</span>:
//             </label>
//             <input
//               type='contactPosition'
//               id='contactPosition'
//               placeholder='Optional'
//               {...register('contactPosition')}
//               className='border-2 rounded-lg col-span-6 p-2 text-lg placeholder:text-gray-300 bg-slate-50 bg-opacity-60 focus:ring-4 focus:ring-green-300'
//             />
//             {errors.contactPosition && (
//               <FieldError message={errors.contactPosition.message} />
//             )}

//             <label htmlFor='contactPhoneNumber' className='col-span-6'>
//               Contact's Phone Number
//             </label>
//             <input
//               type='contactPhoneNumber'
//               id='contactPhoneNumber'
//               placeholder='8412238765'
//               {...register('contactPhoneNumber')}
//               className='border-2 rounded-lg col-span-6 p-2 text-lg placeholder:text-gray-300 focus:ring-4 focus:ring-blue-400'
//             />
//             {errors.contactPhoneNumber && (
//               <FieldError message={errors.contactPhoneNumber.message} />
//             )}

//             <NextStepButton
//               content='contact'
//               step={step}
//               getValues={getValues}
//               nextStepCallback={nextStepCallback}
//             />
//           </GridContainer>
//         </div>
//       )}

//       {/* STEP THREE */}
//       {step === '3' && (
//         <div>
//           <div className='grid grid-cols-6 gap-4'>
//             <label htmlFor='companyName' className='col-span-6'>
//               Company Name:
//             </label>
//             <input
//               type='companyName'
//               id='companyName'
//               placeholder='Acme'
//               {...register('companyName')}
//               className='border-2 rounded-lg col-span-6 p-2 text-lg placeholder:text-gray-300 focus:ring-4 focus:ring-blue-400'
//             />
//             {errors.companyName && (
//               <FieldError message={errors.companyName.message} />
//             )}

//             <label htmlFor='accountPayableEmail' className='col-span-6'>
//               Account Payable Email{' '}
//               <span className='text-gray-400 text-sm'>
//                 (Please write N/A if not applicable)
//               </span>
//               :
//             </label>
//             <input
//               type='accountPayableEmail'
//               id='accountPayableEmail'
//               placeholder='payable@email.com'
//               {...register('accountPayableEmail')}
//               className='border-2 rounded-lg col-span-6 p-2 text-lg placeholder:text-gray-300 focus:ring-4 focus:ring-blue-400'
//             />
//             {errors.accountPayableEmail && (
//               <FieldError message={errors.accountPayableEmail.message} />
//             )}

//             <label htmlFor='paymentMethod' className='col-span-6'>
//               Payment Method:
//             </label>
//             <select
//               id='paymentMethod'
//               {...register('paymentMethod')}
//               className='border-2 rounded-lg col-span-5 p-2 text-lg focus:ring-4 focus:ring-blue-400'
//             >
//               <option value=''>{paymentMethodOptions.default}</option>
//               {paymentMethodOptions.methods.map((method) => (
//                 <option key={method.key}>{method.value}</option>
//               ))}
//             </select>
//             {errors.paymentMethod && (
//               <FieldError message={errors.paymentMethod.message} />
//             )}

//             <NextStepButton
//               content='contact'
//               step={step}
//               getValues={getValues}
//               nextStepCallback={nextStepCallback}
//             />
//           </div>
//         </div>
//       )}

//       {/* STEP four*/}
//       {step === '4' && (
//         <div>
//           <div className='grid grid-cols-6 gap-4'>
//             <label htmlFor='shippingStreetAddress' className='col-span-6'>
//               Address:
//             </label>
//             <input
//               type='shippingStreetAddress'
//               id='shippingStreetAddress'
//               placeholder='123 Main St'
//               {...register('shippingStreetAddress')}
//               className='border-2 rounded-lg col-span-6 p-2 text-lg placeholder:text-gray-300 focus:ring-4 focus:ring-blue-400'
//             />
//             {errors.shippingStreetAddress && (
//               <FieldError message={errors.shippingStreetAddress.message} />
//             )}

//             <label htmlFor='shippingUnit' className='col-span-6'>
//               Unit <span className='text-gray-400 font-light'>(Optional)</span>:
//             </label>
//             <input
//               type='shippingUnit'
//               id='shippingUnit'
//               placeholder='Optional'
//               {...register('shippingUnit')}
//               className='border-2 rounded-lg col-span-6 p-2 text-lg bg-slate-50 bg-opacity-60 placeholder:text-gray-300 focus:ring-4 focus:ring-green-300'
//             />
//             {errors.shippingUnit && (
//               <FieldError message={errors.shippingUnit.message} />
//             )}

//             <label htmlFor='shippingCity' className='col-span-6'>
//               City:
//             </label>
//             <input
//               type='shippingCity'
//               id='shippingCity'
//               placeholder='Toronto'
//               {...register('shippingCity')}
//               className='col-span-6 border-2 rounded-lg p-2 text-lg placeholder:text-gray-300 focus:ring-4 focus:ring-blue-400'
//             />
//             {errors.shippingCity && (
//               <FieldError message={errors.shippingCity.message} />
//             )}

//             <div className='col-span-full grid grid-cols-12 gap-4'>
//               <label htmlFor='shippingState' className='row-start-1 col-span-4'>
//                 Province:
//               </label>
//               <input
//                 type='shippingState'
//                 id='shippingState'
//                 placeholder='ON'
//                 {...register('shippingState')}
//                 className='row-start-2 col-span-4 border-2 rounded-lg p-2 text-lg placeholder:text-gray-300 focus:ring-4 focus:ring-blue-400'
//               />
//               {errors.shippingState && (
//                 <FieldError message={errors.shippingState.message} />
//               )}

//               <label
//                 htmlFor='shippingPostalCode'
//                 className='row-start-1 col-start-6 col-span-6'
//               >
//                 Postal Code:
//               </label>
//               <input
//                 type='shippingPostalCode'
//                 id='shippingPostalCode'
//                 placeholder='X2X 2X2'
//                 {...register('shippingPostalCode')}
//                 className='row-start-2 col-start-6 col-span-6 border-2 rounded-lg p-2 text-lg placeholder:text-gray-300 focus:ring-4 focus:ring-blue-400'
//               />
//               {errors.shippingPostalCode && (
//                 <FieldError message={errors.shippingPostalCode.message} />
//               )}
//             </div>

//             <label htmlFor='deliveryInstructions' className='col-span-6'>
//               Delivery Instructions:
//             </label>
//             <textarea
//               id='deliveryInstructions'
//               placeholder='Deliver to side door...'
//               {...register('deliveryInstructions')}
//               className='border-2 rounded-lg col-span-6 p-2 text-lg placeholder:text-gray-300 focus:ring-4 focus:ring-blue-400'
//             />
//             {errors.deliveryInstructions && (
//               <FieldError message={errors.deliveryInstructions.message} />
//             )}

//             {/* Same as Billing */}
//             <div className='col-span-full flex items-center gap-4 mb-6 mt-3'>
//               <input
//                 type='checkbox'
//                 id='sameAsBilling'
//                 name='sameAsBilling'
//                 checked={isChecked}
//                 onChange={handleCheckbox}
//               />
//               <label htmlFor='sameAsBilling'>
//                 Use same address for billing?
//               </label>
//             </div>

//             {/* Populate with shipping details if checked */}
//             <label htmlFor='billingStreetAddress' className='col-span-6'>
//               Billing Address:
//             </label>
//             <input
//               type='billingStreetAddress'
//               id='billingStreetAddress'
//               placeholder='123 Main St'
//               {...register('billingStreetAddress')}
//               className='border-2 rounded-lg col-span-6 p-2 text-lg placeholder:text-gray-300 focus:ring-4 focus:ring-blue-400'
//             />
//             {errors.billingStreetAddress && (
//               <FieldError message={errors.billingStreetAddress.message} />
//             )}

//             <label htmlFor='billingUnit' className='col-span-6'>
//               Billing Unit{' '}
//               <span className='text-gray-400 font-light'>(Optional)</span>:
//             </label>
//             <input
//               type='billingUnit'
//               id='billingUnit'
//               {...register('billingUnit')}
//               placeholder='Optional'
//               className='border-2 rounded-lg col-span-6 p-2 text-lg bg-gray-50 bg-opacity-60 placeholder:text-gray-300 focus:ring-4 focus:ring-green-300'
//             />
//             {errors.billingUnit && (
//               <FieldError message={errors.billingUnit.message} />
//             )}

//             <label htmlFor='billingCity' className='col-span-6'>
//               Billing City:
//             </label>
//             <input
//               type='billingCity'
//               id='billingCity'
//               placeholder='Toronto'
//               {...register('billingCity')}
//               className='border-2 rounded-lg col-span-6 p-2 text-lg placeholder:text-gray-300 focus:ring-4 focus:ring-blue-400'
//             />
//             {errors.billingCity && (
//               <FieldError message={errors.billingCity.message} />
//             )}

//             <label htmlFor='billingState' className='col-span-6'>
//               Billing State:
//             </label>
//             <input
//               type='billingState'
//               id='billingState'
//               placeholder='ON'
//               {...register('billingState')}
//               className='border-2 rounded-lg col-span-6 p-2 text-lg placeholder:text-gray-300 focus:ring-4 focus:ring-blue-400'
//             />
//             {errors.billingState && (
//               <FieldError message={errors.billingState.message} />
//             )}

//             <label htmlFor='billingPostalCode' className='col-span-6'>
//               Billing Postal Code:
//             </label>
//             <input
//               type='billingPostalCode'
//               id='billingPostalCode'
//               placeholder='X2X 2X2'
//               {...register('billingPostalCode')}
//               className='border-2 rounded-lg col-span-6 p-2 text-lg placeholder:text-gray-300 focus:ring-4 focus:ring-blue-400'
//             />
//             {errors.billingPostalCode && (
//               <FieldError message={errors.billingPostalCode.message} />
//             )}

//             <FinalSubmitButton />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

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
      className='mt-6 col-span-6 border-2 flex items-center justify-center gap-3 p-2 rounded-lg focus:ring-4 focus:ring-blue-400 bg-light-greenish/70'
    >
      Create Account
    </button>
  );
}

function NextStepButton({
  content,
  step,
  getValues,
  nextStepCallback,
}: {
  content: string;
  step: Steps;
  getValues: UseFormGetValues<SignUpFormData>;
  nextStepCallback: () => void;
}) {
  const queryClient = useQueryClient();
  const { notify } = useToast();

  type Key =
    | 'email'
    | 'password'
    | 'contactName'
    | 'contactPhoneNumber'
    | 'companyName'
    | 'accountPayableEmail'
    | 'paymentMethod'
    | 'shippingStreetAddress'
    | 'shippingCity'
    | 'shippingState'
    | 'shippingPostalCode'
    | 'billingStreetAddress'
    | 'billingCity'
    | 'billingState'
    | 'billingPostalCode';

  interface IRequiredFields {
    [step: string]: Key[];
  }

  const requiredFields: IRequiredFields = {
    '1': ['email', 'password'],
    '2': ['contactName', 'contactPhoneNumber'],
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

    function handleComplete() {
      // define current form state
      const formValues = getValues();
      // spread all values except for password
      const { password, ...secureFormValues } = formValues;
      // set form state to cache
      queryClient.setQueryData(['form-values'], secureFormValues);

      // evoke callback from parent
      nextStepCallback();
    }

    isStepComplete(step) ? handleComplete() : handleNotComplete();
  };

  return (
    <button
      onClick={(e) => handleNextStep(e)}
      className={`mt-6 active:shadow-inner col-start-4 col-span-3 border-2 flex items-center justify-center gap-3 p-2 rounded-lg focus:ring-4 focus:ring-blue-400`}
    >
      <span>{content}</span>
      <span>
        <IoIosReturnRight />
      </span>
    </button>
  );
}
