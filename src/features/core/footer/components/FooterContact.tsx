import { Heading } from '@/shared/components/ui';
import { FC } from 'react';

interface FooterContactProps {}

export const FooterContact: FC<FooterContactProps> = ({}) => {
  return (
    <div className='w-full lg:self-start'>
      <Heading as='h6' content='Contact Us' className='mb-1' />

      <div className='bg-light-secondary rounded-lg py-2 px-4'>
        <p>(416) 259-1557</p>
        <p>orders@chasersjuice.com</p>
      </div>
    </div>
  );
};
