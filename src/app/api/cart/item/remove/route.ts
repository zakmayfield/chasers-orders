import { getAuthSession } from '@/lib/auth/auth.options';
import { db } from '@/lib/prisma';
import { RemoveCartItemRequest } from '@/types/cart';

async function handler(req: Request) {
  const session = await getAuthSession();

  if (!session?.user) {
    return new Response('Unauthorized. Please log in to continue.', {
      status: 401,
    });
  }

  const body: RemoveCartItemRequest = await req.json();

  if (!body.unitId || !body.cartId) {
    return new Response("Valid ID's are required", {
      status: 400,
    });
  }

  try {
    const deletedItemID = await db.unitsOnCart.delete({
      where: {
        cartId_unitId: body,
      },
      select: {
        unitId: true,
      },
    });

    return new Response(JSON.stringify(deletedItemID), {
      status: 200,
    });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }
  }
}

export { handler as DELETE };
