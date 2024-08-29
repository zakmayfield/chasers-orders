import { db } from '@/lib/prisma';
import { checkAuthentication } from '@/shared/utils/api/checkAuthentication';
import { errorResponse } from '@/shared/utils/api/errorResponse';
import { getSearchParams } from '@/shared/utils/api/getSearchParams';
import { getCartItem } from '@/shared/utils/db/cart';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { user_id } = await checkAuthentication();
    const product_variant_id = getSearchParams(
      req.nextUrl.searchParams,
      'product_variant_id'
    );
    const { cart_id } = await db.cart.findUniqueOrThrow({
      where: { user_id },
      select: { cart_id: true },
    });
    const data = await getCartItem({ cart_id, product_variant_id });
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return errorResponse(error);
  }
}
