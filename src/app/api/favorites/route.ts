import { NextRequest } from 'next/server';
import { checkAuthentication } from '@/shared/utils/api/checkAuthentication';
import { errorResponse } from '@/shared/utils/api/errorResponse';
import { getFavoritesByUserId } from '@/shared/utils/db/favorite';
import { getSearchParams } from '@/shared/utils/api/getSearchParams';

async function handler(req: NextRequest) {
  try {
    const { user_id } = await checkAuthentication();
    const hasProduct = getSearchParams(req.nextUrl.searchParams, 'product');
    const args = {
      user_id,
      product: !!hasProduct,
    };

    const favorites = await getFavoritesByUserId({ ...args });

    return new Response(JSON.stringify(favorites), { status: 200 });
  } catch (error) {
    return errorResponse(error);
  }
}
export { handler as GET };
