import { getAuthSession } from '@/lib/auth/auth.options';
import { db } from '@/lib/prisma';
import { CreateOrderPayload } from '@/services/mutations/createOrder';
import { client } from '@/lib/trigger';

export async function POST(req: Request) {
  const session = await getAuthSession();

  if (!session?.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const body: CreateOrderPayload = await req.json();
  const { items, cartId } = body;

  if (items?.length === 0 || !cartId) {
    return new Response('Invalid request', { status: 400 });
  }

  const orderLineItemData = items?.map((item) => {
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
      return new Response('Unable to place order at this time', {
        status: 500,
      });
    }
  }
}
