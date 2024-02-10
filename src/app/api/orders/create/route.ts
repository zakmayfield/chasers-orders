import { getAuthSession } from '@/lib/auth/auth.options';
import { db } from '@/lib/db/db.prisma-client';
import { CreateOrderPayload } from '@/services/mutations/orders.create';
import { CartCache } from '@/types/types.cart';
import { client } from '@/lib/trigger';
import { sendOrderEmail } from '@/utils/email.utils';

export async function POST(req: Request) {
  const session = await getAuthSession();

  if (!session?.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const body: CreateOrderPayload = await req.json();
  const { items, cartId } = body;

  const orderLineItemData = items.map((item) => {
    return {
      unitId: item.unitId,
      quantity: item.quantity,
    };
  });

  try {
    const order = await db.order.create({
      data: {
        userId: session!.user.id,
        lineItems: {
          create: orderLineItemData,
        },
      },
      include: {
        lineItems: true,
      },
    });

    await db.unitsOnCart.deleteMany({
      where: {
        cartId,
      },
    });

    const userData = await db.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        email: true,
        company: {
          select: {
            name: true,
          },
        },
      },
    });

    const payload = {
      order,
      userData,
    };

    await client.sendEvent({
      name: 'order.created',
      payload,
    });

    return new Response(JSON.stringify(order), { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }
  }
}
