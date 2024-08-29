import { checkAuthentication } from '@/shared/utils/api/checkAuthentication';
import { errorResponse } from '@/shared/utils/api/errorResponse';
import { getSearchParamsOrThrow } from '@/shared/utils/api/getSearchParams';
import { getOrderById } from '@/shared/utils/db/order';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    await checkAuthentication();
    const order_id = getSearchParamsOrThrow(
      req.nextUrl.searchParams,
      'order_id'
    );
    const data = await getOrderById({ order_id });
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return errorResponse(error);
  }
}
