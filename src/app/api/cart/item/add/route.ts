import { db } from '@/lib/prisma';
import { getAuthSession } from '@/lib/auth/auth.options';
import { fetchCart } from '@/utils/cart';

async function handler(req: Request) {
  const session = await getAuthSession();

  if (!session?.user) {
    return new Response('Unauthorized. Please log in to continue.', {
      status: 401,
    });
  }

  const userId = session.user.id;
  const unitId: string = await req.json();
  let cartId: string;

  try {
    const cart = await fetchCart(userId);
    cartId = cart!.id;

    const itemAlreadyInCart = cart?.items.find(
      (item) => item.unitId === unitId
    );

    if (itemAlreadyInCart) {
      const updatedCartItem = await db.unitsOnCart.update({
        where: { cartId, unitId: itemAlreadyInCart.unitId },
        data: {
          ...itemAlreadyInCart,
          quantity: itemAlreadyInCart.quantity + 1,
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
