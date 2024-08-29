import { checkAuthentication } from '@/shared/utils/api/checkAuthentication';
import { errorResponse } from '@/shared/utils/api/errorResponse';
import { addItemToCart, getCartItems } from '@/shared/utils/db/cart';
import { NextRequest } from 'next/server';

async function handler(req: NextRequest) {
  try {
    const { cart_id } = await checkAuthentication();

    switch (req.method) {
      case 'GET':
        const cartItems = await getCartItems({ cart_id });
        return new Response(JSON.stringify(cartItems), { status: 200 });
      case 'POST':
        const product_variant_id = await req.json();
        const addItem = await addItemToCart({
          cart_id,
          product_variant_id,
          quantity: 1,
        });
        return new Response(JSON.stringify(addItem), { status: 200 });
    }
  } catch (error) {
    return errorResponse(error);
  }
}
export { handler as GET, handler as POST };
