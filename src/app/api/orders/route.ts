import { NextRequest } from 'next/server';
import { resolveRequestBody } from '@/shared/utils/api/resolveRequestBody';
import { checkAuthentication } from '@/shared/utils/api/checkAuthentication';
import { errorResponse } from '@/shared/utils/api/errorResponse';
import { createOrder, getOrdersByUserId } from '@/shared/utils/db/order';
import { TCreateOrderRequestPayload } from '@/shared/types/Order';

export async function handler(req: NextRequest) {
  try {
    const { user_id } = await checkAuthentication();

    const line_items =
      await resolveRequestBody<TCreateOrderRequestPayload>(req);

    const args = { user_id, line_items };

    switch (req.method) {
      case 'GET':
        const data = await getOrdersByUserId({ ...args });
        return new Response(JSON.stringify(data), { status: 200 });

      case 'POST':
        const order = await createOrder({ ...args });
        return new Response(JSON.stringify(order), { status: 201 });
    }
  } catch (error) {
    return errorResponse(error);
  }
}
export { handler as GET, handler as POST };
