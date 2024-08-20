import { LoadingSpinner } from '@/shared/components';
import { FC } from 'react';

interface SignInButtonProps {
  isSubmitted: boolean;
  isSubmitSuccessful: boolean;
}

export const SignInButton: FC<SignInButtonProps> = ({
  isSubmitted,
  isSubmitSuccessful,
}) => {
  return (
    <button
      type='submit'
      className={`border-2 rounded-lg p-2 col-span-6 focus:ring-4 focus:ring-blue-400 mt-6 h-12
        bg-light-green-500 text-lg text-white font-medium 
        hover:bg-light-green-400
        ${isSubmitted && isSubmitSuccessful && 'bg-light-green-300'}
      `}
      disabled={isSubmitted && isSubmitSuccessful}
    >
      {isSubmitted && isSubmitSuccessful ? (
        <LoadingSpinner className='mx-auto text-2xl' />
      ) : (
        'Sign In'
      )}
    </button>
  );
};
