import { db } from '@/lib/prisma';
import { getAuthSession } from '@/lib/auth/auth.options';

export async function GET() {
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
      include: {
        product: true,
      },
    });

    return new Response(JSON.stringify(favorites));
  } catch (error) {
    if (error instanceof Error) {
      return new Response('Unable to get favorites at this time', {
        status: 500,
      });
    }
  }
}
