import { checkAuthentication } from '@/shared/utils/api/checkAuthentication';
import { errorResponse } from '@/shared/utils/api/errorResponse';
import { resolveRequestBody } from '@/shared/utils/api/resolveRequestBody';
import { getCartItem, updateCartItemQuantity } from '@/shared/utils/db/cart';
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
    const { quantity } = await resolveRequestBody<{ quantity: number }>(req);

    const args = {
      cart_id,
      product_variant_id,
    };

    switch (req.method) {
      case 'GET':
        const cartItem = await getCartItem({ ...args });
        return new Response(JSON.stringify(cartItem), { status: 200 });
      case 'PUT':
        const updateQuantity = await updateCartItemQuantity({
          ...args,
          quantity,
        });
        return new Response(JSON.stringify(updateQuantity), { status: 200 });
    }
  } catch (error) {
    return errorResponse(error);
  }
}
export { handler as GET, handler as PUT };
