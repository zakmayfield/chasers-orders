'use client';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { Container } from '@/shared/components/ui';

export const Nav = () => {
  return (
    <Container as='div' width='lg' center={true}>
      <Container as='div' flex='row' flexCenter={true}>
        <Link href='/products' className='rounded px-2 hover:ring-2'>
          Shop
        </Link>
        <Link href='/cart' className='rounded px-2 hover:ring-2'>
          Cart
        </Link>
        <Link href='/dashboard' className='rounded px-2 hover:ring-2'>
          Dashboard
        </Link>
        <button onClick={() => signOut()} className='rounded px-2 hover:ring-2'>
          Logout
        </button>
      </Container>
    </Container>
  );
};
