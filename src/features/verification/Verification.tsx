'use client';

import { FC } from 'react';
import { Heading, VerificationResults } from './components';

interface VerificationProps {
  email: string | null | undefined;
  isVerified: Date | null | undefined;
}

export const Verification: FC<VerificationProps> = ({ email, isVerified }) => {
  return (
    <div className='flex justify-center items-start rounded-lg'>
      <div className='flex flex-col max-w-sm w-full'>
        <Heading />
        <VerificationResults email={email} isVerified={isVerified} />
      </div>
    </div>
  );
};
