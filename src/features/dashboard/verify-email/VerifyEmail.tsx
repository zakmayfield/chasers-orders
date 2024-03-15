'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import GoBack from '@/features/shared/GoBack';
import LoadingSpinner from '@/features/shared/LoadingSpinner';
import { PiCheckCircleDuotone, PiXCircleDuotone } from 'react-icons/pi';
import { useToast } from '@/hooks/general.hooks';
import { verifyEmail } from './utils.verify-email';

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
  const [mutationError, setMutationError] = useState('');

  const { mutate: validateToken, isSuccess } = useMutation({
    mutationFn: verifyEmail,
    onSuccess() {
      // router.push('/dashboard/account-pending');
    },
    onError(error) {
      if (error instanceof Error) {
        errorCallback(error);
      }
    },
  });

  function errorCallback(error: Error) {
    setMutationError(error.message);
    notify(error.message, 'error');
  }

  // TODO: rebuild this mutation with the `nodemailer` example i created
  useEffect(() => {
    if (!hasRun.current) {
      // validateToken(token);
      hasRun.current = true;
    }
  }, [token, validateToken]);

  if (mutationError) {
    return (
      <div className='flex justify-center items-center h-[35rem] rounded-lg'>
        <div className='flex flex-col max-w-sm w-full '>
          <h6 className='mb-6 pb-3 border-b'>Email verification:</h6>

          <div className='mx-auto bg-light-primary p-12 rounded-lg w-full'>
            <p className='mb-3'>Something went wrong</p>
            <p className='flex items-center h-11'>
              <PiXCircleDuotone className='text-2xl text-red-500' />
              <span className='ml-3 text-sm text-red-500'>{mutationError}</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex justify-center items-center h-[35rem] rounded-lg'>
      <div className='flex flex-col max-w-sm w-full '>
        <h6 className='mb-6 border-b pb-3'>Email verification:</h6>

        <div className='mx-auto p-12 bg-light-primary rounded-lg w-full'>
          <p className='mb-3'>Sit tight while we verify your email</p>
          <p className='flex items-center h-11 '>
            <PiXCircleDuotone className='text-red-500' />
            <PiCheckCircleDuotone className='text-light-greenish' />
            <LoadingSpinner className={``} />
            <span className='ml-3 text-gray-500 text-sm'>{email}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
