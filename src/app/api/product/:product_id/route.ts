import { checkAuthentication } from '@/shared/utils/api/checkAuthentication';
import { errorResponse } from '@/shared/utils/api/errorResponse';
import {
  getSearchParams,
  getSearchParamsOrThrow,
} from '@/shared/utils/api/getSearchParams';
import { getProductById } from '@/shared/utils/db/product';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    await checkAuthentication();
    const product_id = getSearchParamsOrThrow(
      req.nextUrl.searchParams,
      'product_id'
    );
    const hasVariants = getSearchParams(req.nextUrl.searchParams, 'variants');

    const args = {
      product_id,
      variants: !!hasVariants,
    };

    const data = await getProductById({ ...args });
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return errorResponse(error);
  }
}
