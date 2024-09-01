import { NextRequest } from 'next/server';
import { checkAuthentication } from '@/shared/utils/api/checkAuthentication';
import { errorResponse } from '@/shared/utils/api/errorResponse';
import { getFavoriteById } from '@/shared/utils/db/favorite';
import { getSearchParams } from '@/shared/utils/api/getSearchParams';

async function handler({ params }: { params: { favorite_id: string } }) {
  try {
    await checkAuthentication();
    const favorite_id = params.favorite_id;
    const args = {
      favorite_id,
    };

    const favorite = await getFavoriteById({ ...args });

    return new Response(JSON.stringify(favorite), { status: 200 });
  } catch (error) {
    return errorResponse(error);
  }
}
export { handler as GET };
