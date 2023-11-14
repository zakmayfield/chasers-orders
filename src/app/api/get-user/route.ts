import { db } from '@/lib/db';
import type { NextRequest } from 'next/server';

export async function handler(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const userId = searchParams.get('userId');

  const user = await db.user.findUnique({
    where: {
      id: userId!,
    },
    select: {
      id: true,
      isApproved: true,
    },
  });

  return new Response(JSON.stringify(user));
}

export { handler as GET };
