'use client';

import { merge } from '@/utils/styles.utils';
import { useRouter } from 'next/navigation';

import { FC } from 'react';

interface GoBackProps {
  className?: string;
}

export const GoBack: FC<GoBackProps> = ({ className }) => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className={merge(`${className || ''}`)}
    >
      Go Back
    </button>
  );
};
