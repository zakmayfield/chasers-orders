import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db.prisma-client';
import { CartCache } from '@/types/types.cart';

export async function POST(req: Request) {
  const session = await getAuthSession();

  if (!session?.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const body: CartCache['items'] = await req.json();

  const orderLineItemData = body.map((item) => {
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
        lineItems: {
          select: {
            id: true,
            quantity: true,
            unitId: true,
          },
        },
      },
    });

    // TODO: clear cart records after creating order

    return new Response(JSON.stringify(order), { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
