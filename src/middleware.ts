import { JWT, getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyUserStatus } from './utils/auth.verify-user-status';

export async function middleware(req: NextRequest) {
  const token: JWT | null = await getToken({ req });

  if (!token) {
    return NextResponse.redirect(new URL('/sign-in', req.nextUrl));
  }

  const { isApproved, emailVerified } = await verifyUserStatus(token);

  if (!emailVerified) {
    return NextResponse.redirect(new URL('/welcome'));
  }

  if (req.nextUrl.pathname === '/products' && !isApproved) {
    return NextResponse.redirect(new URL('/welcome', req.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/products', '/profile/:path*', '/cart/:path*', '/welcome'],
};
