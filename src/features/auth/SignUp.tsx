'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { SignUpFormData } from '@/types/authTypes';
import { AuthSignUpValidator } from '@/lib/validators/user-auth';

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
      shippingDeliveryInstructions: '',
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
    <div>
      <form
        onSubmit={handleSubmit(credentialSignUp)}
        className='border w-80 flex flex-col'
      >
        <label htmlFor='email'>Email:</label>
        <input type='email' id='email' {...register('email')} />
        {errors.email && <p role='alert'>{errors.email?.message}</p>}

        <label htmlFor='password'>Password:</label>
        <input type='password' id='password' {...register('password')} />
        {errors.password && <p role='alert'>{errors.password?.message}</p>}

        <label htmlFor='contactName'>Contact Name:</label>
        <input
          type='contactName'
          id='contactName'
          {...register('contactName')}
        />
        {errors.contactName && (
          <p role='alert'>{errors.contactName?.message}</p>
        )}

        <label htmlFor='contactPosition'>Contact Position:</label>
        <input
          type='contactPosition'
          id='contactPosition'
          {...register('contactPosition')}
        />
        {errors.contactPosition && (
          <p role='alert'>{errors.contactPosition?.message}</p>
        )}

        <label htmlFor='contactPhoneNumber'>Contact Phone Number:</label>
        <input
          type='contactPhoneNumber'
          id='contactPhoneNumber'
          {...register('contactPhoneNumber')}
        />
        {errors.contactPhoneNumber && (
          <p role='alert'>{errors.contactPhoneNumber?.message}</p>
        )}

        <label htmlFor='companyName'>Company Name:</label>
        <input
          type='companyName'
          id='companyName'
          {...register('companyName')}
        />
        {errors.companyName && (
          <p role='alert'>{errors.companyName?.message}</p>
        )}

        <label htmlFor='accountPayableEmail'>Account Payable Email:</label>
        <input
          type='accountPayableEmail'
          id='accountPayableEmail'
          {...register('accountPayableEmail')}
        />
        {errors.accountPayableEmail && (
          <p role='alert'>{errors.accountPayableEmail?.message}</p>
        )}

        <label htmlFor='paymentMethod'>Payment Method:</label>
        <input
          type='paymentMethod'
          id='paymentMethod'
          {...register('paymentMethod')}
        />
        {errors.paymentMethod && (
          <p role='alert'>{errors.paymentMethod?.message}</p>
        )}

        {/* SHIPPING */}
        <label htmlFor='shippingStreetAddress'>Shipping Address:</label>
        <input
          type='shippingStreetAddress'
          id='shippingStreetAddress'
          {...register('shippingStreetAddress')}
        />
        {errors.shippingStreetAddress && (
          <p role='alert'>{errors.shippingStreetAddress?.message}</p>
        )}

        <label htmlFor='shippingUnit'>Shipping Unit:</label>
        <input
          type='shippingUnit'
          id='shippingUnit'
          {...register('shippingUnit')}
        />
        {errors.shippingUnit && (
          <p role='alert'>{errors.shippingUnit?.message}</p>
        )}

        <label htmlFor='shippingCity'>Shipping City:</label>
        <input
          type='shippingCity'
          id='shippingCity'
          {...register('shippingCity')}
        />
        {errors.shippingCity && (
          <p role='alert'>{errors.shippingCity?.message}</p>
        )}

        <label htmlFor='shippingState'>Shipping State:</label>
        <input
          type='shippingState'
          id='shippingState'
          {...register('shippingState')}
        />
        {errors.shippingState && (
          <p role='alert'>{errors.shippingState?.message}</p>
        )}

        <label htmlFor='shippingPostalCode'>Shipping Postal Code:</label>
        <input
          type='shippingPostalCode'
          id='shippingPostalCode'
          {...register('shippingPostalCode')}
        />
        {errors.shippingPostalCode && (
          <p role='alert'>{errors.shippingPostalCode?.message}</p>
        )}

        <label htmlFor='shippingDeliveryInstructions'>
          Delivery Instructions:
        </label>
        <input
          type='shippingDeliveryInstructions'
          id='shippingDeliveryInstructions'
          {...register('shippingDeliveryInstructions')}
        />
        {errors.shippingDeliveryInstructions && (
          <p role='alert'>{errors.shippingDeliveryInstructions?.message}</p>
        )}

        {/* BILLING */}
        <label htmlFor='billingStreetAddress'>Billing Address:</label>
        <input
          type='billingStreetAddress'
          id='billingStreetAddress'
          {...register('billingStreetAddress')}
        />
        {errors.billingStreetAddress && (
          <p role='alert'>{errors.billingStreetAddress?.message}</p>
        )}

        <label htmlFor='billingUnit'>Billing Unit:</label>
        <input
          type='billingUnit'
          id='billingUnit'
          {...register('billingUnit')}
        />
        {errors.billingUnit && (
          <p role='alert'>{errors.billingUnit?.message}</p>
        )}

        <label htmlFor='billingCity'>Billing City:</label>
        <input
          type='billingCity'
          id='billingCity'
          {...register('billingCity')}
        />
        {errors.billingCity && (
          <p role='alert'>{errors.billingCity?.message}</p>
        )}

        <label htmlFor='billingState'>Billing State:</label>
        <input
          type='billingState'
          id='billingState'
          {...register('billingState')}
        />
        {errors.billingState && (
          <p role='alert'>{errors.billingState?.message}</p>
        )}

        <label htmlFor='billingPostalCode'>Billing Postal Code:</label>
        <input
          type='billingPostalCode'
          id='billingPostalCode'
          {...register('billingPostalCode')}
        />
        {errors.billingPostalCode && (
          <p role='alert'>{errors.billingPostalCode?.message}</p>
        )}

        <button type='submit'>Sign Up</button>
      </form>

      <Link href='/sign-in'>Go to Sign In</Link>
    </div>
  );
}
