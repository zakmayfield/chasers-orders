import { getAuthSession } from '@/lib/auth/auth.options';
import { db } from '@/lib/prisma';

export async function GET() {
  const session = await getAuthSession();

  if (!session?.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const id = session?.user.id ?? '';

  try {
    const user = await db.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        isApproved: true,
        emailVerified: true,
        contact: true,
        orders: {
          take: 1,
          orderBy: {
            createdAt: 'desc',
          },
        },
        favorites: {
          orderBy: {
            createdAt: 'desc',
          },
        },
        company: true,
      },
    });

    if (!user) {
      return new Response('Could not fetch user data', { status: 404 });
    }

    return new Response(JSON.stringify(user));
  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }
  }
}
