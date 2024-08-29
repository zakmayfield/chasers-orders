import { checkAuthentication } from '@/shared/utils/api/checkAuthentication';
import { errorResponse } from '@/shared/utils/api/errorResponse';
import { getSearchParams } from '@/shared/utils/api/getSearchParams';
import { getOrdersByUserId } from '@/shared/utils/db/order';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { user_id } = await checkAuthentication();
    const line_items = getSearchParams(req.nextUrl.searchParams, 'line-items');
    const args = { user_id, line_items: !!line_items };

    const data = await getOrdersByUserId({ ...args });
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return errorResponse(error);
  }
}
