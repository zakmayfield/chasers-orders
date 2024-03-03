import { FC, useEffect, useState } from 'react';

import Image from 'next/image';
import logoBase from '@/assets/logo-base.png';
import logoSm from '@/assets/logo-sm.png';
import { merge } from '@/utils/styles.utils';

interface ChasersLogoProps {
  screen?: 'sm' | 'base';
  className?: string;
}

const altText = 'Chasers Juice Logo';

// TODO: on refresh, logo will show the default size
// if default size is 'base' but component needs 'sm'
// then the logo will flash the default (base) before changing to 'sm'

const ChasersLogo: FC<ChasersLogoProps> = ({
  screen = 'base',
  className = '',
}) => {
  const [screenSize, setScreenSize] =
    useState<ChasersLogoProps['screen']>('base');

  useEffect(() => {
    setScreenSize(screen);
  }, [screen]);

  return (
    <Image
      alt={altText}
      src={screenSize === 'base' ? logoBase : logoSm}
      className={merge(`${className}`)}
    />
  );
};

export default ChasersLogo;
