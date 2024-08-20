'use client';

import { FC } from 'react';
import { VerificationResults } from './components';
import { Heading } from '@/shared/components/ui';

interface VerificationProps {
  email: string | undefined;
}

export const Verification: FC<VerificationProps> = ({ email }) => {
  return (
    <div className='flex justify-center items-start rounded-lg'>
      <div className='flex flex-col gap-3 max-w-sm w-full'>
        <Heading as='h6' content='Verification' />
        <VerificationResults email={email} />
      </div>
    </div>
  );
};
