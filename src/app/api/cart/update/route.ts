import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

async function handler(req: Request) {
  const session = await getAuthSession();

  // determine user auth
  if (!session?.user) {
    return new Response(
      JSON.stringify({ message: 'Unauthorized. Please log in to continue.' }),
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const quantityPayload = Number(body.quantityPayload);
    const unitId: string = body.unitId;
    const cartId: string = body.cartId;

    switch (true) {
      case !quantityPayload:
        return new Response(JSON.stringify({ error: 'Quantity is required' }), {
          status: 400,
        });
        break;

      case quantityPayload <= 0:
        return new Response(
          JSON.stringify({ error: 'Quantiy should be a value greater than 0' }),
          { status: 400 }
        );
        break;
    }

    if (!cartId || !unitId) {
      return new Response(
        JSON.stringify({ error: 'Cart ID & Unit ID are required' }),
        { status: 400 }
      );
    }

    const updated = await db.cart
      .update({
        where: { id: cartId },
        data: {
          items: {
            update: {
              where: {
                cartId_unitId: {
                  cartId,
                  unitId,
                },
              },
              data: {
                quantity: quantityPayload,
              },
            },
          },
        },
      })
      .catch((err) => {
        if (err instanceof PrismaClientKnownRequestError) {
          return new Response(
            JSON.stringify({
              error: 'Could not update item',
              message: err.message,
              requestedPaylod: {
                unitId,
                cartId,
              },
            }),
            {
              status: 500,
            }
          );
        }
      });

    return new Response(
      JSON.stringify({ message: 'success', response: updated }),
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }
  }
}

export { handler as PUT };
