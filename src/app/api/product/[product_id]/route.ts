import { NextRequest } from 'next/server';
import { checkAuthentication } from '@/shared/utils/api/checkAuthentication';
import { errorResponse } from '@/shared/utils/api/errorResponse';
import { getSearchParams } from '@/shared/utils/api/getSearchParams';
import { getProductById } from '@/shared/utils/db/product';

export async function GET(
  req: NextRequest,
  { params }: { params: { product_id: string } }
) {
  try {
    await checkAuthentication();
    const product_id = params.product_id;
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
