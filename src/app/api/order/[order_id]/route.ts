import { NextRequest } from 'next/server';
import { checkAuthentication } from '@/shared/utils/api/checkAuthentication';
import { errorResponse } from '@/shared/utils/api/errorResponse';
import { getSearchParams } from '@/shared/utils/api/getSearchParams';
import { getOrderById } from '@/shared/utils/db/order';

export async function GET(
  req: NextRequest,
  { params }: { params: { order_id: string } }
) {
  try {
    await checkAuthentication();

    const order_id = params.order_id;
    const hasLineItems = getSearchParams(
      req.nextUrl.searchParams,
      'line-items'
    );

    const args = { order_id, line_items: !!hasLineItems };

    const data = await getOrderById({ ...args });
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return errorResponse(error);
  }
}
