import { db } from '@/lib/prisma';
import { getAuthSession } from '@/lib/auth/auth.options';

async function handler(req: Request) {
  const session = await getAuthSession();

  if (!session?.user) {
    return new Response('Unauthorized. Please log in to continue.', {
      status: 401,
    });
  }

  const userId = session.user.id;
  const unitId: string = await req.json();
  let cartId: string | null = null;

  try {
    const cart = await db.cart.findUnique({
      where: { userId },
      include: {
        items: true,
      },
    });

    cartId = cart!.id;

    // create cart record if user does not have a cart
    if (!cart) {
      const createdCart = await db.cart.create({
        data: {
          userId,
        },
      });

      cartId = createdCart.id;
    }

    // check for existing unit in cart
    const unitExistsInCart = cart!.items.find((item) => item.unitId === unitId);

    if (unitExistsInCart) {
      const updatedCartItem = await db.unitsOnCart.update({
        where: { cartId, unitId: unitExistsInCart.unitId },
        data: {
          ...unitExistsInCart,
          quantity: unitExistsInCart.quantity + 1,
        },
        include: {
          unit: {
            include: {
              product: true,
            },
          },
        },
      });

      return new Response(JSON.stringify(updatedCartItem), {
        status: 201,
      });
    }

    const cartIem = await db.unitsOnCart.create({
      data: {
        unitId,
        cartId,
        quantity: 1,
      },
      include: {
        unit: {
          include: {
            product: true,
          },
        },
      },
    });

    return new Response(JSON.stringify(cartIem), {
      status: 201,
    });
  } catch (error) {
    if (error instanceof Error) {
      return new Response('Unable to add item to the cart at this time', {
        status: 500,
      });
    }
  }
}

export { handler as POST };
