import { FC } from 'react';

import Image from 'next/image';
import { merge } from '@/utils/styles.utils';
import logoBase from '@/assets/logo-base.png';
import logoSm from '@/assets/logo-sm.png';

const altText = 'Chasers Juice Logo';

interface LogoProps {
  className?: string;
}

export const LogoBase: FC<LogoProps> = ({ className = '' }) => {
  return (
    <Image alt={altText} src={logoBase} className={merge(`${className}`)} />
  );
};

export const LogoSm: FC<LogoProps> = ({ className = '' }) => {
  return <Image alt={altText} src={logoSm} className={merge(`${className}`)} />;
};
