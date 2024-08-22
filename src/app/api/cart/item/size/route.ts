import { getAuthSession } from '@/lib/auth/auth.options';
import { db } from '@/lib/prisma';

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
      selectedUnitId: string;
    };

    const body: ReqBody = await req.json();
    const unitId: string = body.unitId;
    const cartId: string = body.cartId;
    const selectedUnitId: string = body.selectedUnitId;

    if (!cartId || !unitId) {
      return new Response('Cart ID, Unit ID, and Size are required', {
        status: 400,
      });
    }

    const u = await db.unitsOnCart.update({
      where: { cartId_unitId: { cartId, unitId } },
      data: { unitId: selectedUnitId },
      select: {
        cartId: true,
        unitId: true,
        quantity: true,
        createdAt: true,
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

export { handler as PUT };
