'use client';
import { Button } from '@/shared/components/ui';
import { useRouter } from 'next/navigation';

export const ReturnToDashboardButton = () => {
  const router = useRouter();

  return (
    <Button
      text='Return to Dashboard'
      fontWeight='normal'
      width='full'
      handleClick={() => router.push('/dashboard')}
      className='mt-6'
    />
  );
};
