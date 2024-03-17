'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import GoBack from '@/features/shared/GoBack';
import LoadingSpinner from '@/features/shared/LoadingSpinner';
import { PiCheckCircleDuotone, PiXCircleDuotone } from 'react-icons/pi';
import { useToast } from '@/hooks/general.hooks';
import { verifyEmail } from './services.verify-email';
import {
  useSendVerificationEmail,
  useValidateVerificationToken,
} from './helpers.verify-email';

export default function VerifyEmail({
  email,
}: {
  email: string | null | undefined;
}) {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  return (
    <div>
      {token ? (
        <div>
          <VerifyEmailContent email={email} token={token} />
        </div>
      ) : (
        <div className='flex justify-center items-center min-h-[24rem]'>
          <div>
            <p className='mb-6 text-red-500'>No token found</p>
            <GoBack className='rounded-lg w-full text-center p-2 bg-light-greenish text-white hover:bg-light-greenish/80' />
          </div>
        </div>
      )}
    </div>
  );
}

function VerifyEmailContent({
  token,
  email,
}: {
  token: string;
  email: string | null | undefined;
}) {
  const { notify } = useToast();
  const hasRun = useRef(false);
  const router = useRouter();

  const {
    validateToken,
    isSuccess: isValidateSucess,
    data: validateData,
    isError: isValidateError,
    error: validateError,
  } = useValidateVerificationToken({
    onSuccessCallback(data) {
      // router.push('/dashboard/account-pending');
      console.log('success ~~', data);
      notify(data);
    },
    onErrorCallback(error) {
      console.log('error ~~', error);
      notify(error.message, 'error');
    },
  });

  const {
    send,
    data: sendEmailData,
    isSuccess: isSendEmailSuccess,
    isError: isSendEmailError,
    error: sendEmailError,
  } = useSendVerificationEmail({
    onSuccessCallback(data) {
      console.log('success ~~', data);
      notify(data.responseMessage);
    },
    onErrorCallback(error) {
      console.log('error ~~', error);
      notify(error.message, 'error');
    },
  });

  useEffect(() => {
    if (!hasRun.current) {
      validateToken({ token: '123' });
      hasRun.current = true;
    }
  }, [token, validateToken]);

  return (
    <div className='flex justify-center items-center h-[35rem] rounded-lg'>
      <div className='flex flex-col max-w-sm w-full'>
        <h6 className='mb-6 border-b pb-3'>Email verification:</h6>
        <div className='mx-auto mb-6 p-12 bg-light-primary rounded-lg w-full'>
          <p className='mb-3'>Sit tight while we verify your email</p>
          <p className='flex items-center h-11 '>
            <PiXCircleDuotone className='text-red-500' />
            <PiCheckCircleDuotone className='text-light-greenish' />
            <LoadingSpinner className={``} />
            <span className='ml-3 text-gray-500 text-sm'>{email}</span>
          </p>
        </div>

        <div>
          <button onClick={() => send()}>manually send email</button>
          {isSendEmailError && sendEmailError && (
            <p>{sendEmailError.message}</p>
          )}
          {isSendEmailSuccess && sendEmailData && (
            <p>{sendEmailData.responseMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
}

/*
   {isValidateError && validateError instanceof Error ? (
      <div className='mx-auto mb-6 bg-light-primary p-12 rounded-lg w-full'>
        <p className='mb-3'>Something went wrong</p>
        <p className='flex items-center h-11'>
          <PiXCircleDuotone className='text-2xl text-red-500' />
          <span className='ml-3 text-sm text-red-500'>
            {validateError.message}
          </span>
        </p>
      </div>
    ) : (
      <div className='mx-auto mb-6 p-12 bg-light-primary rounded-lg w-full'>
        <p className='mb-3'>Sit tight while we verify your email</p>
        <p className='flex items-center h-11 '>
          <PiXCircleDuotone className='text-red-500' />
          <PiCheckCircleDuotone className='text-light-greenish' />
          <LoadingSpinner className={``} />
          <span className='ml-3 text-gray-500 text-sm'>{email}</span>
        </p>
      </div>
    )}
*/
