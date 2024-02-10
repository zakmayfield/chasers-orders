import { db } from '@/lib/prisma';
import { getAuthSession } from '@/lib/auth/auth.options';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const session = await getAuthSession();

  if (!session || !session.user) {
    return new Response('Unauthenticated', { status: 400 });
  }

  const { id: userId } = session.user;

  try {
    const favorites = await db.favorite.findMany({
      where: { userId },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        createdAt: true,
        juiceId: true,
        juice: true,
      },
    });

    return new Response(JSON.stringify(favorites));
  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }
  }
}
