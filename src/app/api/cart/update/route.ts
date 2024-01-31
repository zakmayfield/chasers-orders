import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db.prisma-client';

async function handler(req: Request) {
  const session = await getAuthSession();

  // determine user auth
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

    return new Response(JSON.stringify(u), {
      status: 200,
    });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }
  }
}

export { handler as PUT };
