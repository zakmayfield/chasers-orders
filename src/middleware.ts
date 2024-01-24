import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.redirect(new URL('/sign-in', req.nextUrl));
  }

  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const apiUrl = new URL(`/api/auth/user?userId=${token.id}`, baseURL);

  const { isApproved, emailVerified } = await fetch(apiUrl)
    .then((response) => response.json())
    .catch((error) => console.log(error));

  if (
    req.nextUrl.pathname.startsWith('/bar') &&
    (!isApproved || !emailVerified)
  ) {
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
  matcher: ['/products', '/profile/:path*', '/cart', '/welcome'],
};
