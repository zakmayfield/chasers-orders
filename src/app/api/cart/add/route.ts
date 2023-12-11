import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';

async function handler(req: Request) {
  const session = await getAuthSession();

  // determine user auth
  if (!session?.user) {
    return new Response(
      JSON.stringify({ message: 'Unauthorized. Please log in to continue.' }),
      { status: 401 }
    );
  }

  // variables
  const body: string = await req.json();
  const unitId = body;
  const userId = session.user.id;
  let cartId: string;

  try {
    // find user + cart from session ID
    const user = await db.user.findUnique({
      where: { id: userId },
      include: {
        cart: {
          include: {
            items: true,
          },
        },
      },
    });

    // validate user's cart
    if (!user?.cart) {
      const createdCart = await db.cart.create({
        data: {
          userId,
        },
      });

      cartId = createdCart.id;
    } else {
      cartId = user.cart.id;

      // check for existing unit in cart
      const unitExistsInCart = user.cart.items.find(
        (unit) => unit.unitId === unitId
      );

      if (unitExistsInCart) {
        return new Response(
          JSON.stringify({ message: 'Item already in cart' }),
          {
            status: 409,
          }
        );
      }
    }

    // create new junction record
    await db.unitsOnCart.create({
      data: {
        unitId,
        cartId,
        quantity: 1,
      },
    });

    return new Response(
      JSON.stringify({ message: 'Item successfully added to the cart' }),
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return new Response(
        JSON.stringify({ message: 'Server error', error: error.message }),
        {
          status: 500,
        }
      );
    }
  }
}

export { handler as POST };
