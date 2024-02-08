import { db } from '@/lib/db/db.prisma-client';
import { getAuthSession } from '@/lib/auth/auth.options';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const session = await getAuthSession();

  if (!session || !session.user) {
    return new Response('Unauthenticated', { status: 400 });
  }

  const searchParams = req.nextUrl.searchParams;
  const extendedFlag = searchParams.get('extended');

  function isExtended(flag: string | null) {
    return flag === 'true';
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
        juice: isExtended(extendedFlag),
      },
    });

    return new Response(JSON.stringify(favorites));
  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }
  }
}
