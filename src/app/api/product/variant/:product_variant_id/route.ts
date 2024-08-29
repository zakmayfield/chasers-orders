import { checkAuthentication } from '@/shared/utils/api/checkAuthentication';
import { errorResponse } from '@/shared/utils/api/errorResponse';
import {
  getSearchParams,
  getSearchParamsOrThrow,
} from '@/shared/utils/api/getSearchParams';
import { getProductVariantById } from '@/shared/utils/db/product';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    await checkAuthentication();
    const product_variant_id = getSearchParamsOrThrow(
      req.nextUrl.searchParams,
      'product_variant_id'
    );
    const product = getSearchParams(req.nextUrl.searchParams, 'product');

    const args = {
      product_variant_id,
      hasProduct: !!product,
    };

    const data = await getProductVariantById({ ...args });
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return errorResponse(error);
  }
}
