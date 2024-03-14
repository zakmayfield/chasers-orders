'use client';

import { merge } from '@/utils/styles.utils';
import { useRouter } from 'next/navigation';

export default function GoBack({ className }: { className?: string }) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className={merge(`${className || ''}`)}
    >
      Go Back
    </button>
  );
}
