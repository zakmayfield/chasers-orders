import { FC } from 'react';

import Image from 'next/image';
import logoSm from '@/assets/logo-sm.png';
import { merge } from '@/utils/styles.utils';

interface LogoSmProps {
  className?: string;
}

const altText = 'Chasers Juice Logo';

export const LogoSm: FC<LogoSmProps> = ({ className = '' }) => {
  return <Image alt={altText} src={logoSm} className={merge(`${className}`)} />;
};
