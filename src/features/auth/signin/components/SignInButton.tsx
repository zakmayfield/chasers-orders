import LoadingSpinner from '@/features/shared/LoadingSpinner';
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
      className={`border-2 rounded-lg p-2 col-span-6 focus:ring-4 focus:ring-blue-400 mt-6 bg-light-greenish/70 text-lg text-white font-medium h-12
                  ${isSubmitted && isSubmitSuccessful && 'bg-light-greenish/50'}`}
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
