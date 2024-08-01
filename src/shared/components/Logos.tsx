import { FC } from 'react';

import Image from 'next/image';
import { merge } from '@/utils/styles';
import logoBase from '@/assets/logo-base.png';
import logoSm from '@/assets/logo-sm.png';

const altText = 'Chasers Juice Logo';

interface LogoProps {
  className?: string;
  priority?: boolean;
}

export const LogoBase: FC<LogoProps> = ({
  className = '',
  priority = false,
}) => {
  return (
    <Image
      alt={altText}
      src={logoBase}
      width={150}
      priority={priority}
      className={merge(`${className}`)}
    />
  );
};

export const LogoSm: FC<LogoProps> = ({ className = '' }) => {
  return <Image alt={altText} src={logoSm} className={merge(`${className}`)} />;
};
