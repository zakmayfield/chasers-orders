import { db } from '@/lib/prisma';
import type { NextRequest } from 'next/server';

async function handler(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const userId = searchParams.get('userId');

  if (!userId) {
    return new Response('User ID is required input', { status: 400 });
  }

  try {
    const user = await db.user.findUnique({
      where: {
        id: userId!,
      },
      select: {
        id: true,
        isApproved: true,
        emailVerified: true,
      },
    });

    return new Response(JSON.stringify(user));
  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }
  }
}

export { handler as GET };
