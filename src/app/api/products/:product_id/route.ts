import { checkAuthentication } from '@/shared/utils/api/checkAuthentication';
import { errorResponse } from '@/shared/utils/api/errorResponse';
import { getSearchParams } from '@/shared/utils/api/getSearchParams';
import { getProductById } from '@/shared/utils/db/product';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const product_id = getSearchParams(req.nextUrl.searchParams, 'product_id');

  try {
    await checkAuthentication();
    const data = await getProductById({ product_id });
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return errorResponse(error);
  }
}
