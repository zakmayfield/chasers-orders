import { getAuthSession } from '@/lib/auth/auth.options';
import { db } from '@/lib/prisma';
import { OrderType } from '@/features/dashboard/recent-orders/RecentOrders';

export async function POST(req: Request) {
  const session = await getAuthSession();

  if (!session?.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const body: OrderType = await req.json();

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
    const lineItems = body.lineItems;
    const createdRecordsCount = await db.unitsOnCart.createMany({
      data: lineItems.map((item) => {
        return {
          unitId: item.unitId,
          cartId: cartId.id,
          quantity: item.quantity,
        };
      }),
    });

    const returnPayload = {
      createdRecordsCount,
      records: lineItems,
    };

    return new Response(JSON.stringify(returnPayload), { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message), { status: 500 };
    }
  }
}
