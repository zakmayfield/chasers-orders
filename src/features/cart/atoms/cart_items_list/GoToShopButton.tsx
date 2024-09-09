import { Btn } from '@/shared/components/ui';
import { useRouter } from 'next/navigation';

export const GoToShopButton = () => {
  const router = useRouter();
  return (
    <Btn
      text='Go to shop'
      handleClick={() => router.push('/products')}
      border={true}
      width='full'
      bgColor='green'
    />
  );
};
