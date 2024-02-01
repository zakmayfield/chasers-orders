import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db.prisma-client';
import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
} from '@prisma/client/runtime/library';

async function handler(req: Request) {
  const session = await getAuthSession();

  // determine user auth
  if (!session?.user) {
    return new Response('Unauthorized. Please log in to continue.', {
      status: 401,
    });
  }

  const body: string = await req.json();
  const unitId = body;
  const userId = session.user.id;
  let cartId: string | null = null;

  try {
    // find user + cart from session ID
    const cart = await db.cart.findUnique({
      where: { userId },
      include: {
        items: true,
      },
    });

    // create cart record if user does not have a cart
    if (!cart) {
      const createdCart = await db.cart.create({
        data: {
          userId,
        },
      });

      cartId = createdCart.id;
    }

    cartId = cart!.id;

    // check for existing unit in cart
    const unitExistsInCart = cart!.items.find((unit) => unit.unitId === unitId);

    if (unitExistsInCart) {
      return new Response('Item already in cart', {
        status: 409,
      });
    }

    // create new junction record with payload
    const payload = {
      unitId,
      cartId,
      quantity: 1,
    };
    const record = await db.unitsOnCart.create({
      data: {
        ...payload,
      },
      select: {
        unitId: true,
      },
    });

    return new Response(JSON.stringify(record), {
      status: 201,
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return new Response(error.message, {
        status: 500,
      });
    } else if (error instanceof PrismaClientUnknownRequestError) {
      return new Response(error.message, {
        status: 500,
      });
    }

    if (error instanceof Error) {
      return new Response(error.message, {
        status: 500,
      });
    }
  }
}

export { handler as POST };
