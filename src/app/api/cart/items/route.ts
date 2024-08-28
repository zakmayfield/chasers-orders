import { getAuthSession } from '@/lib/auth/auth.options';
import { db } from '@/lib/prisma';
import { checkAuthentication } from '@/shared/utils/api/checkAuthentication';
import { errorResponse } from '@/shared/utils/api/errorResponse';
import { getCartItems } from '@/shared/utils/db/cart';

export async function GET() {
  const session = await getAuthSession();
  try {
    await checkAuthentication();

    const { cart_id } = await db.cart.findUniqueOrThrow({
      where: { user_id: session?.user.id! },
      select: { cart_id: true },
    });

    const data = await getCartItems({ cart_id });
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return errorResponse(error);
  }
}
