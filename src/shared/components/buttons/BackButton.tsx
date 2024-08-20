'use client';

import { merge } from '@/utils/styles';
import { useRouter } from 'next/navigation';

import { FC } from 'react';

interface BackButtonProps {
  className?: string;
}

export const BackButton: FC<BackButtonProps> = ({ className }) => {
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
