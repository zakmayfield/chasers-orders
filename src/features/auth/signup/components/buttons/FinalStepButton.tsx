import { FC } from 'react';
import { LoadingSpinner } from '@/shared';

interface FinalStepButtonProps {
  isSubmitted: boolean;
  isSubmitSuccessful: boolean;
}

export const FinalStepButton: FC<FinalStepButtonProps> = ({
  isSubmitted,
  isSubmitSuccessful,
}) => {
  return (
    <button
      type='submit'
      className={`
        border-2 rounded-lg mt-6 col-span-6 p-2 h-12 font-medium text-white
        flex items-center justify-center gap-3
        focus:ring-4 focus:ring-blue-400 bg-light-green-500 hover:bg-light-green-400
        ${isSubmitted && isSubmitSuccessful && 'bg-light-green-300'}
      `}
      disabled={isSubmitted && isSubmitSuccessful}
    >
      {isSubmitted && isSubmitSuccessful ? (
        <LoadingSpinner className='text-white' />
      ) : (
        'Create Account'
      )}
    </button>
  );
};
