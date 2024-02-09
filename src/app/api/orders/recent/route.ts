import { getAuthSession } from '@/lib/auth/auth.options';
import { db } from '@/lib/db/db.prisma-client';

export async function GET(req: Request) {
  const session = await getAuthSession();

  if (!session?.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const recentOrders = await db.order.findMany({
      take: 5,
      where: { userId: session.user.id },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        lineItems: true,
      },
    });

    return new Response(JSON.stringify(recentOrders), { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message), { status: 500 };
    }
  }
}
