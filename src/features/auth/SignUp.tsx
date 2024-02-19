'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { SignUpFormData } from '@/types/types.auth-forms';
import { AuthSignUpValidator } from '@/lib/validators/validator.auth-form';
import GridContainer from '../ui/layout/GridContainer';

export default function SignUp() {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors, isDirty, isValid },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(AuthSignUpValidator),
    defaultValues: {
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
    },
  });

  const credentialSignUp = async (data: SignUpFormData) => {
    try {
      await signIn('sign-up', {
        ...data,
      });
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  return (
    <div className='border col-start-5 col-span-4 py-6 px-12 font-extralight'>
      <h2 className='font-light text-2xl mb-12'>Sign Up</h2>
      <form onSubmit={handleSubmit(credentialSignUp)}>
        <div className='flex flex-col gap-24'>
          {/* STEP ONE */}
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
            </GridContainer>
          </div>

          {/* STEP TWO */}
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
            </GridContainer>
          </div>

          {/* STEP THREE */}
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
            </GridContainer>
          </div>

          {/* STEP four*/}
          <div>
            <GridContainer cols={6}>
              <label htmlFor='shippingStreetAddress' className='col-span-6'>
                Shipping Address:
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

              {/* BILLING */}
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
            </GridContainer>
          </div>

          <button type='submit' className='col-span-6'>
            Sign Up
          </button>
        </div>
      </form>

      <Link href='/'>Go to Sign In</Link>
    </div>
  );
}
