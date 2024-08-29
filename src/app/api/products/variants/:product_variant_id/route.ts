import { checkAuthentication } from '@/shared/utils/api/checkAuthentication';
import { errorResponse } from '@/shared/utils/api/errorResponse';
import { getSearchParamsOrThrow } from '@/shared/utils/api/getSearchParams';
import { getProductVariantById } from '@/shared/utils/db/product';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const product_variant_id = getSearchParamsOrThrow(
      req.nextUrl.searchParams,
      'product_variant_id'
    );
    await checkAuthentication();
    const data = await getProductVariantById({ product_variant_id });
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return errorResponse(error);
  }
}
