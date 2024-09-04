import { Btn, Container } from '@/shared/components/ui';
import { ShopIcon } from '@/shared/utils/ui';
import Link from 'next/link';

export const FavoritesEmpty = () => {
  return (
    <Container as='div'>
      <Container
        as='div'
        flex='col'
        flexCenter={true}
        width='xs'
        center={true}
        padding='md'
        className='bg-slate-100'
        rounded='sm'
      >
        <Container as='p'>No favorites</Container>
        <Link href='/products' className='w-full'>
          <Btn Icon={ShopIcon} text='Shop' bgColor='green' width='full' />
        </Link>
      </Container>
    </Container>
  );
};
