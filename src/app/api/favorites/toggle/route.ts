import { NextRequest } from 'next/server';
import { checkAuthentication } from '@/shared/utils/api/checkAuthentication';
import { errorResponse } from '@/shared/utils/api/errorResponse';
import {
  addToFavorites,
  deleteFromFavorites,
} from '@/shared/utils/db/favorite';
import { resolveRequestBody } from '@/shared/utils/api/resolveRequestBody';

async function handler(req: NextRequest) {
  try {
    const { user_id } = await checkAuthentication();
    const { action, product_id } = await resolveRequestBody<{
      action: 'add' | 'remove';
      product_id: string;
    }>(req);

    const args = {
      user_id,
      product_id,
    };

    switch (action) {
      case 'add':
        if (!product_id)
          return new Response('Product ID is required to make this request', {
            status: 401,
          });
        const addFavorite = await addToFavorites({ ...args });
        return new Response(JSON.stringify(addFavorite), { status: 201 });

      case 'remove':
        if (!product_id)
          return new Response('Product ID is required to make this request', {
            status: 401,
          });
        const deleteFavorite = await deleteFromFavorites({ ...args });
        return new Response(JSON.stringify(deleteFavorite), { status: 200 });
    }
  } catch (error) {
    return errorResponse(error);
  }
}
export { handler as POST, handler as DELETE };
