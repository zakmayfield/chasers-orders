import { Button } from '@/shared/components/ui';
import { useRouter } from 'next/navigation';

export const GoToShopButton = () => {
  const router = useRouter();
  return (
    <Button
      text='Shop'
      width='full'
      fontWeight='normal'
      handleClick={() => router.push('/products')}
    />
  );
};
