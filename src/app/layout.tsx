import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Nav from '../features/nav/Nav';
import Providers from '@/lib/providers/Providers';
import { ToastContainer } from 'react-toastify';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang='en'>
        <body className={inter.className}>
          <Nav />
          <div>{children}</div>
          <ReactQueryDevtools initialIsOpen={false} />
          <ToastContainer />
        </body>
      </html>
    </Providers>
  );
}
