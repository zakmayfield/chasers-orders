import { FC } from 'react';
import { FooterContact, FooterLinks } from './components';
import FooterLogo from './components/FooterLogo';

interface FooterProps {}

export const Footer: FC<FooterProps> = ({}) => {
  return (
    <div className='min-h-[12rem] bg-light-primary flex items-center w-full'>
      <div className='w-full'>
        <div className='flex items-start gap-6 justify-center border py-3 '>
          <FooterLogo />
          <FooterLinks />
          <FooterContact />
        </div>
      </div>
    </div>
  );
};
