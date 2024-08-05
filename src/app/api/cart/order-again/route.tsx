import { getAuthSession } from '@/lib/auth/auth.options';
import { db } from '@/lib/prisma';
import { OrderAgainData, OrderType } from '@/types/cart';

export async function POST(req: Request) {
  const session = await getAuthSession();

  if (!session?.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const order: OrderType = await req.json();

  try {
    // get cart ID
    const cartId = await db.cart.findUnique({
      where: { userId: session.user.id },
      select: {
        id: true,
      },
    });

    if (!cartId?.id) {
      return new Response('Cart ID is required', { status: 400 });
    }

    // clear cart items
    await db.unitsOnCart.deleteMany({
      where: { cartId: cartId.id },
    });

    // create unitsOnCart records from units of order line items
    const lineItems = order.lineItems;

    const batchPayload = await db.unitsOnCart.createMany({
      data: lineItems.map((item) => {
        return {
          unitId: item.unitId,
          cartId: cartId.id,
          quantity: item.quantity,
        };
      }),
    });

    // Fetch cart cache units
    const cartItems = await db.unitsOnCart.findMany({
      where: { cartId: cartId.id },
      include: {
        unit: {
          include: {
            product: true,
          },
        },
      },
    });

    const returnPayload: OrderAgainData = {
      batchPayload,
      cartPayload: {
        id: cartId.id,
        userId: session.user.id,
        items: cartItems,
      },
    };

    return new Response(JSON.stringify(returnPayload), { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }
  }
}
