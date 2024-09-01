import { checkAuthentication } from '@/shared/utils/api/checkAuthentication';
import { errorResponse } from '@/shared/utils/api/errorResponse';
import { getSearchParams } from '@/shared/utils/api/getSearchParams';
import { getAllProducts } from '@/shared/utils/db/product';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    await checkAuthentication();
    const hasVariants = getSearchParams(req.nextUrl.searchParams, 'variants');
    const take = getSearchParams(req.nextUrl.searchParams, 'take') || undefined;

    const args = {
      variants: !!hasVariants,
      take: Number(take),
    };

    const data = await getAllProducts({ ...args });
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return errorResponse(error);
  }
}
