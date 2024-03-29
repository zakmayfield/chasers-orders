'use client';

import { FC } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { PiFacebookLogoDuotone, PiInstagramLogoDuotone } from 'react-icons/pi';

interface FooterLinksProps {}

export const FooterLinks: FC<FooterLinksProps> = ({}) => {
  return (
    <div className='flex flex-col gap-4 w-full'>
      <div>
        <h6 className='mb-1'>Chasers Fresh Juice</h6>
        <FooterNav />
      </div>

      <div>
        <h6 className='mb-1'>Socials</h6>
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
          <PiFacebookLogoDuotone />
        </Link>
        <Link
          href='https://www.instagram.com/chasersjuicetoronto/'
          target='_blank'
        >
          <PiInstagramLogoDuotone />
        </Link>
      </div>
    </div>
  );
}
