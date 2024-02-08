import { getAuthSession } from '@/lib/auth/auth.options';
import { db } from '@/lib/db/db.prisma-client';

export async function POST(req: Request) {
  const session = await getAuthSession();

  if (!session?.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const body = await req.json();
  const productId = body;

  if (!productId || typeof productId !== 'string') {
    return new Response('Invalid input', { status: 400 });
  }

  console.log(productId);

  try {
    const f = await db.favorite.create({
      data: {
        juiceId: productId,
        userId: session.user.id,
      },
    });

    return new Response(JSON.stringify(f), { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }
  }
}
