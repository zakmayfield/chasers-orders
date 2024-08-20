import { FC, useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { LoadingSpinner } from '@/shared/components/ui';
import { SendVerificationEmail } from '@/shared/components/buttons';
import { merge } from '@/utils/styles';
import { useToast } from '@/shared/hooks/utils';
import { useCustomMutation } from '@/shared/hooks/custom';
import { updateUserVerification } from '@/services/mutations/updateUserVerification';
import {
  UpdateUserVerificationRequest,
  UpdateUserVerificationResponse,
} from '@/types/verification';
import { CheckIcon, XIcon } from '@/utils/icons';
import { useGetUserStatus } from '@/shared/hooks/data';
import { useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from '@/types/hooks';

interface VerificationResultsProps {
  className?: string;
  email: string | undefined;
}

export const VerificationResults: FC<VerificationResultsProps> = ({
  className,
  email,
}) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const token = useSearchParams().get('token') ?? undefined;
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [userIsApproved, setUserIsApproved] = useState<boolean | null>(null);

  const { notify } = useToast();
  const { data: userStatus } = useGetUserStatus();
  const { mutate, error, isLoading, isError, isSuccess, data } =
    useCustomMutation<
      UpdateUserVerificationResponse,
      UpdateUserVerificationRequest
    >({
      mutationFn: updateUserVerification,
      handleSuccess(data) {
        notify(`Email verification successful: ${data.email}`);

        setUserIsApproved(data.isApproved);
        setIsRedirecting(true);

        queryClient.invalidateQueries([QueryKeys.USER_STATUS]);

        if (data.isApproved) {
          router.push('/products');
          return;
        }
        router.push('/dashboard/account-pending');
      },
      handleError(error) {
        notify(error.message, 'error');
      },
    });

  const hasRun = useRef(false);
  useEffect(() => {
    if (!hasRun.current && userStatus && !userStatus.emailVerified) {
      setTimeout(() => mutate({ token }), 2000);

      hasRun.current = true;
    }
  }, [token, mutate, userStatus?.emailVerified]);

  const getDateString = (date: string) => {
    return new Date(date).toDateString();
  };

  return (
    <div
      className={merge(
        `mx-auto w-full min-h-[35rem] flex flex-col gap-6 ${className}`
      )}
    >
      <div className='bg-light-primary p-12 rounded-lg w-full'>
        <p className='mb-3'>
          {userStatus?.emailVerified
            ? 'Your email is verified'
            : 'Sit tight while we verify your email'}
        </p>
        {userStatus?.emailVerified ? (
          <p className='flex items-center h-11'>
            <CheckIcon className='text-light-green-500' />
            <span className='ml-3 text-gray-500 text-sm'>{email}</span>
          </p>
        ) : (
          <p className='flex items-center h-11'>
            {isLoading ? (
              <LoadingSpinner />
            ) : isError ? (
              <XIcon className='text-red-500' />
            ) : isSuccess ? (
              <CheckIcon className='text-light-green-500' />
            ) : (
              <CheckIcon className='text-gray-400' />
            )}
            <span
              className={`ml-3 text-gray-500 text-sm ${isError && 'text-red-500'} ${isSuccess && 'text-light-green-500'}`}
            >
              {email}
            </span>
          </p>
        )}
      </div>
      <div
        className='min-h-[3rem] px-12 rounded-md'
        //* aria-hidden for screen readers
        aria-hidden={isSuccess || isError}
        aria-describedby='response information containter'
      >
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

      <div
        className='min-h-[3rem] px-12 rounded-md'
        aria-hidden={isError}
        aria-describedby='response information containter'
      >
        {isError && <SendVerificationEmail />}
      </div>

      {isRedirecting && (
        <div className=' bg-slate-50 rounded-lg p-2 mt-6'>
          <div className='flex items-center justify-center gap-6'>
            <LoadingSpinner className='text-3xl' />
            <p className='text-gray-500'>
              redirecting to:{' '}
              <span>{userIsApproved ? 'shop' : 'dashboard'}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
