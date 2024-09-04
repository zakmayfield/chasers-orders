import { checkAuthentication } from '@/shared/utils/api/checkAuthentication';
import { errorResponse } from '@/shared/utils/api/errorResponse';
import { getOrderById } from '@/shared/utils/db/order';

export async function GET({ params }: { params: { order_id: string } }) {
  try {
    await checkAuthentication();

    const order_id = params.order_id;
    const args = { order_id };

    const data = await getOrderById({ ...args });
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return errorResponse(error);
  }
}