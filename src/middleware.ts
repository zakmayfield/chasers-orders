import { getToken } from 'next-auth/jwt';
import { NextResponse, NextRequest } from 'next/server';
import { getUserAuth } from './shared/utils/db/user';

/*
  TODO: Implement wrapped middleware: https://next-auth.js.org/configuration/nextjs#advanced-usage
*/

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  const authorization = await getUserAuth({ token });

  //^ All routes except /dashboard will redirect conditionally
  if (
    !req.nextUrl.pathname.includes('/dashboard') &&
    (!authorization?.is_approved || !authorization.email_verified_on)
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
