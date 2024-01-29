import { getAuthSession } from '@/lib/nextAuth/auth';
import { db } from '@/lib/db';

async function handler(req: Request) {
  const session = await getAuthSession();

  // determine user auth
  if (!session?.user) {
    return new Response(
      JSON.stringify({ message: 'Unauthorized. Please log in to continue.' }),
      { status: 401 }
    );
  }

  // variables
  const userId = session.user.id;

  try {
    // retrieve cart record via nested join
    const cart = await db.cart.findUnique({
      where: { userId },
      include: {
        items: {
          orderBy: {
            createdAt: 'asc',
          },
          select: {
            quantity: true,
            unit: {
              select: {
                id: true,
                size: true,
                price: true,
                code: true,
                product: {
                  select: {
                    id: true,
                    name: true,
                    category: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!cart) {
      return new Response(JSON.stringify({ error: 'Could not locate cart' }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(cart), {
      status: 200,
    });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(
        JSON.stringify({ message: 'Server error', error: error.message }),
        {
          status: 500,
        }
      );
    }
  }
}

export { handler as GET };
