import { LogoSm } from '@/shared/components/ui';
import { FC } from 'react';

interface DashboardNavHeaderProps {}

export const DashboardNavHeader: FC<DashboardNavHeaderProps> = ({}) => {
  return (
    <div className='bg-light-secondary flex items-center justify-center h-20 px-1 2xl:px-6'>
      <LogoSm className='mx-auto w-[3rem] 2xl:w-[5rem]' />
    </div>
  );
};
