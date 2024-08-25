'use client';

import { FC } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { Heading } from '@/shared/components/ui';
import { FacebookIcon, InstagramIcon } from '@/utils/icons';

interface FooterLinksProps {}

export const FooterLinks: FC<FooterLinksProps> = ({}) => {
  return (
    <div className='flex flex-col gap-4 w-full'>
      <div>
        <Heading as='h6' content='Chasers Fresh Juice' className='mb-1' />
        <FooterNav />
      </div>

      <div>
        <Heading as='h6' content='Socials' className='mb-1' />
        <FooterSocials />
      </div>
    </div>
  );
};

function FooterNav() {
  return (
    <nav className='flex gap-3 bg-light-secondary rounded-lg py-2 px-4'>
      <Link href='/products'>Shop</Link>
      <Link href='/cart'>Cart</Link>
      <Link href='/dashboard'>Dashboard</Link>
      <button onClick={() => signOut()}>Logout</button>
    </nav>
  );
}

function FooterSocials() {
  return (
    <div className='flex'>
      <div className='flex gap-3 bg-light-secondary py-2 px-4 rounded-lg'>
        <Link
          href='https://www.facebook.com/chasersjuicetoronto/'
          target='_blank'
        >
          <FacebookIcon />
        </Link>
        <Link
          href='https://www.instagram.com/chasersjuicetoronto/'
          target='_blank'
        >
          <InstagramIcon />
        </Link>
      </div>
    </div>
  );
}
