import { checkAuthentication } from '@/shared/utils/api/checkAuthentication';
import { errorResponse } from '@/shared/utils/api/errorResponse';
import { getSearchParams } from '@/shared/utils/api/getSearchParams';
import { getCartItem } from '@/shared/utils/db/cart';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { cart_id } = await checkAuthentication();
    const product_variant_id = getSearchParams(
      req.nextUrl.searchParams,
      'product_variant_id'
    );
    const data = await getCartItem({ cart_id, product_variant_id });
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return errorResponse(error);
  }
}
