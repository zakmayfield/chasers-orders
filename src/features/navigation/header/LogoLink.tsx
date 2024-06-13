import { FC } from 'react';
import Link from 'next/link';
import { LogoBase } from '@/shared/components';

interface LogoLinkProps {}

export const LogoLink: FC<LogoLinkProps> = ({}) => {
  return (
    <Link href='/products' className='w-28 rounded hover:ring-2'>
      <LogoBase priority={true} />
    </Link>
  );
};
