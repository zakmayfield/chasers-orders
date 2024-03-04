import { JWT, getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { userStatus } from './utils/auth.utils';

/*
  TODO: Implement wrapped middleware: https://next-auth.js.org/configuration/nextjs#advanced-usage
*/

export async function middleware(req: NextRequest) {
  const token: JWT | null = await getToken({ req });

  if (!token) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  const { isApproved, emailVerified } = await userStatus(token);

  if (
    !req.nextUrl.pathname.includes('/dashboard') &&
    (!isApproved || !emailVerified)
  ) {
    return NextResponse.redirect(
      new URL('/dashboard/account-pending', req.nextUrl)
    );
  }
}
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/products', '/cart/:path*', '/dashboard/:path*'],
};
