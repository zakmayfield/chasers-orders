import { JWT, getToken } from 'next-auth/jwt';
import { NextResponse, NextRequest } from 'next/server';
import { userStatus } from './utils/auth.utils';

/*
  TODO: Implement wrapped middleware: https://next-auth.js.org/configuration/nextjs#advanced-usage
*/

const allowedOrigins = [
  'https://chasers-orders-git-dev-mayfieldcreates.vercel.app/',
  'https://chasers-orders.vercel.app/',
];

const corsOptions = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function middleware(req: NextRequest) {
  const token: JWT | null = await getToken({ req });

  if (!token) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  // Check the origin from the request
  const origin = req.headers.get('origin') ?? '';
  const isAllowedOrigin = allowedOrigins.includes(origin);

  // Handle preflighted requests
  const isPreflight = req.method === 'OPTIONS';

  if (isPreflight) {
    const preflightHeaders = {
      ...(isAllowedOrigin && { 'Access-Control-Allow-Origin': origin }),
      ...corsOptions,
    };
    return NextResponse.json({}, { headers: preflightHeaders });
  }

  // Fetch user account status from token
  const { isApproved, emailVerified } = await userStatus(token);

  // All routes except /dashboard will redirect conditionally
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
  matcher: ['/products', '/cart/:path*', '/dashboard/:path*'],
};
