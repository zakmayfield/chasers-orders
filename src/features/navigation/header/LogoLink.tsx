import { LogoBase } from '@/features/shared/Logos';
import Link from 'next/link';
import { FC } from 'react';

interface LogoLinkProps {}

export const LogoLink: FC<LogoLinkProps> = ({}) => {
  return (
    <Link href='/products' className='w-28'>
      <LogoBase priority={true} />
    </Link>
  );
};
