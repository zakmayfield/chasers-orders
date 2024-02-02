import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db.prisma-client';

export async function GET(req: Request) {
  const session = await getAuthSession();

  if (!session?.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const orders = await db.order.findMany({
      where: { userId: session.user.id },
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        lineItems: true,
      },
    });

    return new Response(JSON.stringify(orders), { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message), { status: 500 };
    }
  }
}
