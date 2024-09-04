import { TCreateCartItemRequestPayload } from '@/shared/types/Cart';
import { checkAuthentication } from '@/shared/utils/api/checkAuthentication';
import { errorResponse } from '@/shared/utils/api/errorResponse';
import { getSearchParams } from '@/shared/utils/api/getSearchParams';
import { resolveRequestBody } from '@/shared/utils/api/resolveRequestBody';
import {
  addItemToCart,
  checkIsItemInCart,
  deleteCartItem,
  emptyCart,
  getCartItems,
  incrementCartItemQuantity,
} from '@/shared/utils/db/cart';
import { getFirstVariantId } from '@/shared/utils/db/product';
import { NextRequest } from 'next/server';

async function handler(req: NextRequest) {
  try {
    const { cart_id } = await checkAuthentication();
    let { product_variant_id, product_id } =
      await resolveRequestBody<TCreateCartItemRequestPayload>(req);

    const args = {
      cart_id,
      product_variant_id,
    };

    switch (req.method) {
      case 'GET':
        const cartItems = await getCartItems({ ...args });
        return new Response(JSON.stringify(cartItems), { status: 200 });

      case 'POST':
        if (product_id) {
          const firstVariantId = await getFirstVariantId({ product_id });
          const { quantity } = await checkIsItemInCart({
            cart_id,
            product_variant_id: firstVariantId,
          });
          if (quantity) {
            const updateQuantity = await incrementCartItemQuantity({
              cart_id,
              product_variant_id: firstVariantId,
              currentQuantity: quantity,
            });
            return new Response(JSON.stringify(updateQuantity), {
              status: 200,
            });
          }

          const addItem = await addItemToCart({
            cart_id,
            product_variant_id: firstVariantId,
            quantity: 1,
          });
          return new Response(JSON.stringify(addItem), { status: 201 });
        }

        const { quantity } = await checkIsItemInCart({
          cart_id,
          product_variant_id: product_variant_id!,
        });
        if (quantity) {
          const updateQuantity = await incrementCartItemQuantity({
            cart_id,
            product_variant_id: product_variant_id!,
            currentQuantity: quantity,
          });
          return new Response(JSON.stringify(updateQuantity), { status: 200 });
        }

        const addItem = await addItemToCart({
          cart_id,
          product_variant_id: product_variant_id!,
          quantity: 1,
        });
        return new Response(JSON.stringify(addItem), { status: 201 });

      case 'DELETE':
        const empty = getSearchParams(req.nextUrl.searchParams, 'empty');
        if (empty) {
          const batchPayload = await emptyCart({ cart_id });
          return new Response(JSON.stringify(batchPayload), {
            status: 200,
          });
        }
        const deleteItem = await deleteCartItem({
          cart_id,
          product_variant_id: product_variant_id!,
        });
        return new Response(JSON.stringify(deleteItem), { status: 200 });
    }
  } catch (error) {
    return errorResponse(error);
  }
}
export { handler as GET, handler as POST, handler as DELETE };
