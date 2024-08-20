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
      className={merge(
        `p-2 rounded-lg w-36 bg-light-green-400 text-white ${className}`
      )}
    >
      Go Back
    </button>
  );
};
