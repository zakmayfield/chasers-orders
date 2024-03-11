import { FC } from 'react';
import { FooterContact, FooterLinks } from './components';
import FooterLogo from './components/FooterLogo';

interface FooterProps {}

export const Footer: FC<FooterProps> = ({}) => {
  return (
    <div className='min-h-[275px] bg-light-primary flex items-start w-full'>
      <div className='w-full py-12'>
        <div className='flex items-start gap-20 justify-center'>
          <FooterLogo />
          <FooterLinks />
          <FooterContact />
        </div>
      </div>
    </div>
  );
};
