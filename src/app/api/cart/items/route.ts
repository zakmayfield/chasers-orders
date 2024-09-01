import { checkAuthentication } from '@/shared/utils/api/checkAuthentication';
import { errorResponse } from '@/shared/utils/api/errorResponse';
import { getSearchParams } from '@/shared/utils/api/getSearchParams';
import { resolveRequestBody } from '@/shared/utils/api/resolveRequestBody';
import {
  addItemToCart,
  deleteCartItem,
  emptyCart,
  getCartItems,
} from '@/shared/utils/db/cart';
import { NextRequest } from 'next/server';

async function handler(req: NextRequest) {
  try {
    const { cart_id } = await checkAuthentication();
    let body = await resolveRequestBody<string>(req);

    const hasProductVariant = getSearchParams(
      req.nextUrl.searchParams,
      'product_variant'
    );

    const args = {
      cart_id,
      product_variant_id: body,
      product_variant: !!hasProductVariant,
    };

    switch (req.method) {
      case 'GET':
        const cartItems = await getCartItems({ ...args });
        return new Response(JSON.stringify(cartItems), { status: 200 });

      case 'POST':
        const addItem = await addItemToCart({ ...args, quantity: 1 });
        return new Response(JSON.stringify(addItem), { status: 201 });

      case 'DELETE':
        const empty = getSearchParams(req.nextUrl.searchParams, 'empty');
        if (empty) {
          const batchPayload = await emptyCart({ cart_id });
          return new Response(JSON.stringify(batchPayload), {
            status: 200,
          });
        } else {
          const deleteItem = await deleteCartItem({ ...args });
          return new Response(JSON.stringify(deleteItem), { status: 200 });
        }
    }
  } catch (error) {
    return errorResponse(error);
  }
}
export { handler as GET, handler as POST, handler as DELETE };
