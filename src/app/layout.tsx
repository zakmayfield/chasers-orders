import './globals.css';

import type { Metadata } from 'next';
import { Quicksand } from 'next/font/google';

import Providers from '@/lib/Providers';
import { ToastContainer } from 'react-toastify';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import Header from '@/features/navigation/header/Header';
import { getAuthSession } from '@/lib/auth/auth.options';
import { Footer } from '@/features/footer';

const quicksand = Quicksand({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthSession();
  const isAuth = !!session?.user;
  return (
    <html lang='en'>
      <Providers>
        <body className={quicksand.className}>
          {isAuth && <Header />}

          <div className='py-6 min-h-screen'>{children}</div>
          <ReactQueryDevtools initialIsOpen={false} />
          <ToastContainer limit={4} autoClose={3000} position='bottom-right' />

          {isAuth && <Footer />}
        </body>
      </Providers>
    </html>
  );
}
