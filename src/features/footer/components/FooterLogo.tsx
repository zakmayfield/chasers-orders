'use client';
import { FC } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import logosmall from '@/assets/logo-sm.png';

interface FooterLogoProps {}

const FooterLogo: FC<FooterLogoProps> = ({}) => {
  const router = useRouter();
  return (
    <div className='border-b lg:border-b-0 w-full flex pb-3 mb-3 lg:pb-0 lg:mb-0'>
      <div className='mx-auto'>
        <button
          className='p-2 rounded-lg hover:ring-2'
          onClick={() => router.push('/products')}
          role='link'
        >
          <Image src={logosmall} alt='chasers juice logo' width={75} />
        </button>
      </div>
    </div>
  );
};

export default FooterLogo;
