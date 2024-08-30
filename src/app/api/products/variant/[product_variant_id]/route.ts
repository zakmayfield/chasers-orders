import { NextRequest } from 'next/server';
import { checkAuthentication } from '@/shared/utils/api/checkAuthentication';
import { errorResponse } from '@/shared/utils/api/errorResponse';
import { getSearchParams } from '@/shared/utils/api/getSearchParams';
import { getProductVariantById } from '@/shared/utils/db/product';

export async function GET(
  req: NextRequest,
  { params }: { params: { product_variant_id: string } }
) {
  try {
    await checkAuthentication();
    const product_variant_id = params.product_variant_id;
    const product = getSearchParams(req.nextUrl.searchParams, 'product');

    const args = {
      product_variant_id,
      product: !!product,
    };

    const data = await getProductVariantById({ ...args });
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return errorResponse(error);
  }
}
