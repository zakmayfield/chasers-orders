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

  //^ All routes except /dashboard will redirect conditionally based on authorization
  const authorization = await getUserAuth({ token });

  if (
    !req.nextUrl.pathname.includes('/dashboard') &&
    (!authorization?.is_approved || !authorization.email_verified_on)
  ) {
    return NextResponse.redirect(new URL('/dashboard/account', req.nextUrl));
  }
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/verification',
    '/cart',
    '/products',
    // '/api/cart/:path*',
    // '/api/products/:path*',
    // '/api/orders/:path*',
    // '/api/trigger/:path*',
  ],
};
