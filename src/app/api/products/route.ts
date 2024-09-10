import { NextRequest } from 'next/server';
import { checkAuthentication } from '@/shared/utils/api/checkAuthentication';
import { errorResponse } from '@/shared/utils/api/errorResponse';
import { getSearchParamsArray } from '@/shared/utils/api/getSearchParams';
import { getAllProducts } from '@/shared/utils/db/product';

export async function GET(req: NextRequest) {
  try {
    await checkAuthentication();
    const [hasTake] = getSearchParamsArray(req.nextUrl.searchParams, ['take']);

    const take =
      (hasTake && hasTake !== 'false' && Number(hasTake)) || undefined;

    const args = {
      take,
    };

    const data = await getAllProducts({ ...args });
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return errorResponse(error);
  }
}
