'use client';
import { Btn } from '@/shared/components/ui';
import { useRouter } from 'next/navigation';

export const ReturnToDashboardButton = () => {
  const router = useRouter();

  return (
    <Btn
      text='Return to Dashboard'
      handleClick={() => router.push('/dashboard')}
      width='full'
      fontWeight='normal'
      bgColor='green'
      className='mt-6'
    />
  );
};
