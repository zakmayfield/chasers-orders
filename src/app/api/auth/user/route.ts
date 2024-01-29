import { db } from '@/lib/prisma.db';
import type { NextRequest } from 'next/server';

async function handler(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const userId = searchParams.get('userId');

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
}

export { handler as GET };
