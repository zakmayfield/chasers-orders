'use client';
import Link from 'next/link';
import { Container, PageTemplate } from '@/shared/components/ui';

export const DashboardTemplate = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <PageTemplate title='Dashboard' width='full' className='border'>
      <Container as='div' flex='row'>
        <Link href='/dashboard'>Home</Link>
        <Link href='/dashboard/favorites'>Favorites</Link>
        <Link href='/dashboard/orders'>Orders</Link>
        <Link href='/dashboard/account'>Account</Link>
      </Container>

      <Container as='div' padding='lg' rounded='md' className='bg-slate-50'>
        {children}
      </Container>
    </PageTemplate>
  );
};
