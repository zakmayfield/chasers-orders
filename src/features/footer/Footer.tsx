import { FC } from 'react';
import { FooterContact, FooterLinks } from './components';
import FooterLogo from './components/FooterLogo';

interface FooterProps {}

export const Footer: FC<FooterProps> = ({}) => {
  return (
    <div className='min-h-[275px] bg-light-primary flex items-start w-full  py-6 '>
      <div className='max-w-xs w-full mx-auto lg:max-w-max lg:w-full py-12 bg-white px-6 mb-6 lg:mb-0 rounded-2xl'>
        <div className='flex flex-col lg:flex-row lgitems-start gap-4 lg:gap-20'>
          <FooterLogo />
          <FooterLinks />
          <FooterContact />
        </div>
      </div>
    </div>
  );
};
