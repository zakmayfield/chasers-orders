import { checkAuthentication } from '@/shared/utils/api/checkAuthentication';
import { errorResponse } from '@/shared/utils/api/errorResponse';
import { resolveRequestBody } from '@/shared/utils/api/resolveRequestBody';
import {
  getCartItem,
  updateCartItemQuantity,
  updateCartItemSize,
} from '@/shared/utils/db/cart';
import { NextRequest } from 'next/server';

async function handler(
  req: NextRequest,
  {
    params,
  }: {
    params: { product_variant_id: string };
  }
) {
  try {
    const { cart_id } = await checkAuthentication();
    const product_variant_id = params.product_variant_id;

    const { quantity, new_variant_id } = await resolveRequestBody<{
      quantity: number;
      new_variant_id: string;
    }>(req);

    const args = {
      cart_id,
      product_variant_id,
    };

    switch (req.method) {
      case 'GET':
        const cartItem = await getCartItem({ ...args });
        return new Response(JSON.stringify(cartItem), { status: 200 });
      case 'PUT':
        if (req.nextUrl.searchParams.get('quantity')) {
          const updateQuantity = await updateCartItemQuantity({
            ...args,
            quantity,
          });
          return new Response(JSON.stringify(updateQuantity), { status: 200 });
        } else if (req.nextUrl.searchParams.get('size')) {
          const updateSize = await updateCartItemSize({
            ...args,
            new_variant_id,
          });
          return new Response(JSON.stringify(updateSize), { status: 200 });
        }
    }
  } catch (error) {
    return errorResponse(error);
  }
}
export { handler as GET, handler as PUT };
