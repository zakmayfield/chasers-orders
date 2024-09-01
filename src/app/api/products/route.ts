import { NextRequest } from 'next/server';
import { checkAuthentication } from '@/shared/utils/api/checkAuthentication';
import { errorResponse } from '@/shared/utils/api/errorResponse';
import { getSearchParamsArray } from '@/shared/utils/api/getSearchParams';
import { getAllProducts } from '@/shared/utils/db/product';

export async function GET(req: NextRequest) {
  try {
    await checkAuthentication();
    const [hasVariants, hasTake] = getSearchParamsArray(
      req.nextUrl.searchParams,
      ['variants', 'take']
    );

    const variants = hasVariants && hasVariants === 'true' ? true : false;
    const take =
      (hasTake && hasTake !== 'false' && Number(hasTake)) || undefined;

    const args = {
      variants,
      take,
    };

    const data = await getAllProducts({ ...args });
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return errorResponse(error);
  }
}
