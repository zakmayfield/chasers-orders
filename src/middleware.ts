import { JWT, getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyApprovalAndEmail } from './utils/auth.verify';

export async function middleware(req: NextRequest) {
  const token: JWT | null = await getToken({ req });

  if (!token) {
    return NextResponse.redirect(new URL('/sign-in', req.nextUrl));
  }

  const { isApproved, emailVerified } = await verifyApprovalAndEmail(token);

  if (req.nextUrl.pathname.startsWith('/bar') && !isApproved) {
    const notice = 'Your account must be approved to accesss that page';
    const encodedString = encodeURIComponent(notice);

    return NextResponse.redirect(
      new URL(`/foo?notice=${encodedString}`, req.nextUrl)
    );
  }

  if (req.nextUrl.pathname === '/products' && !isApproved) {
    return NextResponse.redirect(new URL('/welcome', req.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/products',
    '/profile/:path*',
    '/cart',
    '/welcome',
    '/foo',
    '/bar',
  ],
};
