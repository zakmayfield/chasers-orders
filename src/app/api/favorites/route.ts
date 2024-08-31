import { NextRequest } from 'next/server';
import { checkAuthentication } from '@/shared/utils/api/checkAuthentication';
import { errorResponse } from '@/shared/utils/api/errorResponse';
import {
  addToFavorites,
  deleteFromFavorites,
  getFavoritesByUserId,
} from '@/shared/utils/db/favorite';
import { getSearchParams } from '@/shared/utils/api/getSearchParams';
import { resolveRequestBody } from '@/shared/utils/api/resolveRequestBody';

async function handler(req: NextRequest) {
  try {
    const { user_id } = await checkAuthentication();
    const { product_id, favorite_id } = await resolveRequestBody<{
      product_id?: string;
      favorite_id?: string;
    }>(req);
    const hasProduct = getSearchParams(req.nextUrl.searchParams, 'product');

    const args = {
      user_id,
      product: !!hasProduct,
    };

    switch (req.method) {
      case 'GET':
        const favorites = await getFavoritesByUserId({ ...args });
        return new Response(JSON.stringify(favorites), { status: 200 });

      case 'POST':
        if (!product_id)
          return new Response('Product ID is required to make this request', {
            status: 401,
          });
        const addFavorite = await addToFavorites({ ...args, product_id });
        return new Response(JSON.stringify(addFavorite), { status: 201 });

      case 'DELETE':
        if (!favorite_id)
          return new Response('Favorite ID is required to make this request', {
            status: 401,
          });
        const deleteFavorite = await deleteFromFavorites({
          ...args,
          favorite_id,
        });
        return new Response(JSON.stringify(deleteFavorite), { status: 200 });
    }
  } catch (error) {
    return errorResponse(error);
  }
}
export { handler as GET, handler as POST, handler as DELETE };
