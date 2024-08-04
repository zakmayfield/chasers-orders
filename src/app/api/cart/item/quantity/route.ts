import { UpdateQuantity } from '@/types/cart';
import { getAuthSession } from '@/lib/auth/auth.options';
import { db } from '@/lib/prisma';

export async function PUT(req: Request) {
  const session = await getAuthSession();

  if (!session?.user) {
    return new Response('Unauthorized. Please log in to continue.', {
      status: 401,
    });
  }

  try {
    type ReqBody = UpdateQuantity;

    const body: ReqBody = await req.json();
    const quantity = Number(body.quantity);
    const unitId: string = body.unitId;
    const cartId: string = body.cartId;

    switch (true) {
      case !quantity:
        return new Response('Quantity is required', {
          status: 400,
        });

      case quantity <= 0:
        return new Response('Quantiy should be greater than 0', {
          status: 400,
        });

      case quantity > 100:
        return new Response('Quantiy should be less than 100', {
          status: 400,
        });
    }

    if (!cartId || !unitId) {
      return new Response('Cart ID & Unit ID are required', { status: 400 });
    }

    const u = await db.unitsOnCart.update({
      where: { cartId_unitId: { cartId, unitId } },
      data: { quantity },
      select: {
        unitId: true,
        quantity: true,
        unit: {
          select: {
            size: true,
            code: true,
            product: {
              select: {
                name: true,
                category: true,
              },
            },
          },
        },
      },
    });

    return new Response(JSON.stringify(u));
  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message, {
        status: 500,
      });
    }
  }
}
