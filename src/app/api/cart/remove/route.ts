import { getAuthSession } from '@/lib/nextAuth/auth';
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

  // extract unitId from request body & other variables
  const { unitId, cartId }: { unitId: string; cartId: string } =
    await req.json();

  if (!unitId || !cartId) {
    return new Response(
      JSON.stringify({ error: 'A valid Unit ID and Cart ID are required' }),
      { status: 400 }
    );
  }

  try {
    // query db for UnitsOnCart record
    await db.unitsOnCart.delete({
      where: {
        cartId_unitId: {
          cartId,
          unitId,
        },
      },
    });

    return new Response(JSON.stringify({ message: 'success' }), {
      status: 200,
    });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(
        JSON.stringify({ message: 'error', error: error.message }),
        { status: 500 }
      );
    }
  }
}

export { handler as DELETE };
