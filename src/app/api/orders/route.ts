import { resolveRequestBody } from '@/shared/utils/api/resolveRequestBody';
import { checkAuthentication } from '@/shared/utils/api/checkAuthentication';
import { errorResponse } from '@/shared/utils/api/errorResponse';
import { getSearchParams } from '@/shared/utils/api/getSearchParams';
import { createOrder, getOrdersByUserId } from '@/shared/utils/db/order';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { user_id } = await checkAuthentication();
    const hasLineItems = getSearchParams(
      req.nextUrl.searchParams,
      'line-items'
    );

    const line_items =
      await resolveRequestBody<
        { product_variant_id: string; quantity: number }[]
      >(req);

    const args = { user_id, hasLineItems: !!hasLineItems, line_items };

    switch (req.method) {
      case 'GET':
        const data = await getOrdersByUserId({ ...args });
        return new Response(JSON.stringify(data), { status: 200 });

      case 'POST':
        const order = await createOrder({ ...args });
        return new Response(JSON.stringify(order), { status: 200 });
    }
  } catch (error) {
    return errorResponse(error);
  }
}
