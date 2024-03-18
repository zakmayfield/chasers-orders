import { merge } from '@/utils/styles.utils';
import { FC, useEffect, useRef } from 'react';
import { useVerify } from '../helpers.verify';
import LoadingSpinner from '@/features/shared/LoadingSpinner';
import { PiCheckCircleDuotone, PiXCircleDuotone } from 'react-icons/pi';
import { useSearchParams } from 'next/navigation';
import { useToast } from '@/hooks/general.hooks';

interface VerificationResultsProps {
  className?: string;
  email: string;
  isVerified: Date | null | undefined;
}

export const VerificationResults: FC<VerificationResultsProps> = ({
  className,
  email,
  isVerified,
}) => {
  const { notify } = useToast();
  const token = useSearchParams().get('token') ?? undefined;
  const { verifyEmail, error, isLoading, isError, isSuccess, data } = useVerify(
    {
      onSuccessCallback({ data }) {},
      onErrorCallback({ error }) {},
    }
  );

  const hasRun = useRef(false);
  useEffect(() => {
    if (!hasRun.current && !isVerified) {
      setTimeout(() => verifyEmail({ token }), 1000);
      hasRun.current = true;
    }
  }, [token, verifyEmail]);

  const convertDate = (date: string) => {
    const x = new Date(date).toDateString();
    console.log({ x });
    return x;
  };

  const getDateString = (date: string) => {
    return convertDate(date);
  };

  return (
    <div className={merge(`mx-auto mb-6 w-full ${className}`)}>
      <div className='bg-light-primary p-12 rounded-lg w-full'>
        <p className='mb-3'>
          {isVerified
            ? 'Your email is verified'
            : 'Sit tight while we verify your email'}
        </p>
        {isVerified ? (
          <p className='flex items-center h-11'>
            <PiCheckCircleDuotone className='text-light-greenish' />
            <span className='ml-3 text-gray-500 text-sm'>{email}</span>
          </p>
        ) : (
          <p className='flex items-center h-11'>
            {isLoading ? (
              <LoadingSpinner />
            ) : isError ? (
              <PiXCircleDuotone className='text-red-500' />
            ) : isSuccess ? (
              <PiCheckCircleDuotone className='text-light-greenish' />
            ) : (
              <PiCheckCircleDuotone className='text-gray-400' />
            )}
            <span
              className={`ml-3 text-gray-500 text-sm ${isError && 'text-red-500'} ${isSuccess && 'text-light-greenish'}`}
            >
              {email}
            </span>
          </p>
        )}
      </div>

      <div className='min-h-[3rem] px-12 mt-6 rounded-md'>
        {isError && (
          <div className='flex items-center gap-6 '>
            <div className='h-12 w-5 rounded-sm bg-red-300'></div>
            <p className='text-sm text-red-400'>{error && error.message}</p>
          </div>
        )}
        {isSuccess && (
          <div className='flex items-center gap-6 '>
            <div className='h-12 w-5 rounded-sm bg-green-300'></div>
            <p className='text-sm text-red-400'>
              Verified on: {getDateString(data!.verifiedOn)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
