import { getAuthSession } from '@/lib/auth/auth.options';
import { db } from '@/lib/prisma';

export async function PUT(req: Request) {
  const session = await getAuthSession();

  // determine user auth
  // test
  if (!session?.user) {
    return new Response('Unauthorized. Please log in to continue.', {
      status: 401,
    });
  }

  try {
    type ReqBody = {
      cartId: string;
      unitId: string;
      quantityPayload: number;
    };

    const body: ReqBody = await req.json();
    const quantityPayload = Number(body.quantityPayload);
    const unitId: string = body.unitId;
    const cartId: string = body.cartId;

    switch (true) {
      case !quantityPayload:
        return new Response('Quantity is required', {
          status: 400,
        });
        break;

      case quantityPayload <= 0:
        return new Response('Quantiy should be a value greater than 0', {
          status: 400,
        });
        break;
    }

    if (!cartId || !unitId) {
      return new Response('Cart ID & Unit ID are required', { status: 400 });
    }

    const u = await db.unitsOnCart.update({
      where: { cartId_unitId: { cartId, unitId } },
      data: { quantity: quantityPayload },
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
