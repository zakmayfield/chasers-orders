import { FC } from 'react';

import logoSmall from '@/assets/logo-sm.png';
import Image from 'next/image';

interface DashboardNavHeaderProps {}

export const DashboardNavHeader: FC<DashboardNavHeaderProps> = ({}) => {
  return (
    <div className='bg-light-secondary flex items-center justify-center h-20 px-1 2xl:px-6'>
      <Image
        src={logoSmall}
        width={100}
        alt='Chasers Juice logo'
        className='mx-auto w-[3rem] 2xl:w-[5rem]'
      />
    </div>
  );
};
