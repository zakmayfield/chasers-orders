import { getAuthSession } from '@/lib/auth/auth.options';
import { db } from '@/lib/prisma';
import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
} from '@prisma/client/runtime/library';

async function handler() {
  const session = await getAuthSession();

  // determine user auth
  if (!session?.user) {
    return new Response('Unauthorized. Please log in to continue.', {
      status: 401,
    });
  }

  const userId = session.user.id;

  try {
    const cart = await db.cart.findUnique({
      where: { userId },
      include: {
        items: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            unit: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });

    return new Response(JSON.stringify(cart), {
      status: 200,
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return new Response(error.message, {
        status: 500,
      });
    } else if (error instanceof PrismaClientUnknownRequestError) {
      return new Response(error.message, {
        status: 500,
      });
    }

    if (error instanceof Error) {
      return new Response('Server error', {
        status: 500,
      });
    }
  }
}

export { handler as GET };
