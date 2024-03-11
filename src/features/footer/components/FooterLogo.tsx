import { FC } from 'react';
import Image from 'next/image';
import logosmall from '@/assets/logo-sm.png';

interface FooterLogoProps {}

const FooterLogo: FC<FooterLogoProps> = ({}) => {
  return (
    <div className='self-center'>
      <Image src={logosmall} alt='chasers juice logo' width={75} />
    </div>
  );
};

export default FooterLogo;
