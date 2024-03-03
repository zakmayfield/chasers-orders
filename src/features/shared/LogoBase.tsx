import { FC } from 'react';

import Image from 'next/image';
import logoBase from '@/assets/logo-base.png';
import { merge } from '@/utils/styles.utils';

interface LogoBaseProps {
  className?: string;
}

const altText = 'Chasers Juice Logo';

export const LogoBase: FC<LogoBaseProps> = ({ className = '' }) => {
  return (
    <Image alt={altText} src={logoBase} className={merge(`${className}`)} />
  );
};
