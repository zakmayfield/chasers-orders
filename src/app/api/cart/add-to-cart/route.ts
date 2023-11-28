import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';

async function handler(req: Request) {
  const session = await getAuthSession();

  if (!session?.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const body: string = await req.json();
  const unitId = body;
  // TODO: validate body with custom validator

  try {
    const userId = session.user.id;

    const user = await db.user.findUnique({
      where: { id: userId },
      include: {
        cart: true,
      },
    });

    let cartId;

    if (!user?.cart) {
      const createdCart = await db.cart.create({
        data: {
          userId,
        },
      });

      cartId = createdCart.id;
    } else {
      cartId = user.cart.id;
    }

    /**
     * TODO
     * Verify UnitsOnCart record
     * - if unique UnitsOnCart (cartId + unitId) record exists increase quantity
     * - if not then continue
     */

    const unitOnCart = await db.unitsOnCart.create({
      data: {
        unitId,
        cartId,
        quantity: 1,
      },
    });

    return new Response('1', { status: 201 });
  } catch (error) {
    return new Response('0', { status: 500 });
  }
}

export { handler as POST };
