import { JWT, getToken } from 'next-auth/jwt';
import { NextResponse, NextRequest } from 'next/server';
import { getUserAuthorization } from '@/services/queries/getUserAuthorization';

/*
  TODO: Implement wrapped middleware: https://next-auth.js.org/configuration/nextjs#advanced-usage
*/

export async function middleware(req: NextRequest) {
  const token: JWT | null = await getToken({ req });

  if (!token) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  const { isApproved, emailVerified } = await getUserAuthorization(token);

  //^ All routes except /dashboard will redirect conditionally
  if (
    !req.nextUrl.pathname.includes('/dashboard') &&
    (!isApproved || !emailVerified)
  ) {
    return NextResponse.redirect(
      new URL('/dashboard/account-pending', req.nextUrl)
    );
  }
}

export const config = {
  matcher: [
    '/products',
    '/cart/:path*',
    '/dashboard/:path*',
    '/api/cart/:path*',
    '/api/orders/:path*',
    '/api/products/:path*',
    '/api/trigger/:path*',
  ],
};
