'use client';

import { FC } from 'react';
import { Heading, VerificationResults } from './components';

interface VerifyProps {
  email: string;
  isVerified: Date | null | undefined;
}

export const Verify: FC<VerifyProps> = ({ email, isVerified }) => {
  return (
    <div className='flex justify-center items-center h-[35rem] rounded-lg'>
      <div className='flex flex-col max-w-sm w-full'>
        <Heading />
        <VerificationResults email={email} isVerified={isVerified} />
      </div>
    </div>
  );
};
