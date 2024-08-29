import { checkAuthentication } from '@/shared/utils/api/checkAuthentication';
import { errorResponse } from '@/shared/utils/api/errorResponse';
import {
  getSearchParams,
  getSearchParamsOrThrow,
} from '@/shared/utils/api/getSearchParams';
import { getOrderById } from '@/shared/utils/db/order';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    await checkAuthentication();
    const order_id = getSearchParamsOrThrow(
      req.nextUrl.searchParams,
      'order_id'
    );
    const line_items = getSearchParams(req.nextUrl.searchParams, 'line-items');
    const args = { order_id, line_items: !!line_items };

    const data = await getOrderById({ ...args });
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return errorResponse(error);
  }
}
