'use client';

import { FC } from 'react';
import { VerificationResults } from './components';
import { Heading } from '@/shared/components/ui';

interface VerificationProps {
  email: string | null | undefined;
  isVerified: Date | null | undefined;
}

export const Verification: FC<VerificationProps> = ({ email, isVerified }) => {
  return (
    <div className='flex justify-center items-start rounded-lg'>
      <div className='flex flex-col gap-3 max-w-sm w-full'>
        <Heading as='h6' content='Verification' />
        <VerificationResults email={email} isVerified={isVerified} />
      </div>
    </div>
  );
};
