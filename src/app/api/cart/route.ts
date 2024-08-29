import { checkAuthentication } from '@/shared/utils/api/checkAuthentication';
import { errorResponse } from '@/shared/utils/api/errorResponse';
import {
  createCart,
  getCartWithItemsAndProductVariants,
} from '@/shared/utils/db/cart';
import { NextRequest } from 'next/server';

async function handler(req: NextRequest) {
  try {
    const { user_id } = await checkAuthentication();

    switch (req.method) {
      case 'GET':
        const cart = await getCartWithItemsAndProductVariants({
          user_id,
        });
        return new Response(JSON.stringify(cart), { status: 200 });

      case 'POST':
        const createdCart = await createCart({ user_id });
        return new Response(JSON.stringify(createdCart), { status: 200 });
    }
  } catch (error) {
    return errorResponse(error);
  }
}
export { handler as GET, handler as POST };
