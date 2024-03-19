import { merge } from '@/utils/styles.utils';
import { FC } from 'react';

interface ResendVerificationProps {
  className?: string;
}

export const ResendVerification: FC<ResendVerificationProps> = ({
  className,
}) => {
  return (
    <div className={merge(`flex items-center gap-6 ${className}`)}>
      <button
        className='text-sm text-purple-700 underline'
        onClick={() => console.log('evoke send email mutation')}
      >
        Need a new verification email?
      </button>
    </div>
  );
};
