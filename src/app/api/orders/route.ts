import { checkAuthentication } from '@/shared/utils/api/checkAuthentication';
import { errorResponse } from '@/shared/utils/api/errorResponse';
import { getOrdersByUserId } from '@/shared/utils/db/order';

export async function GET() {
  try {
    const { user_id } = await checkAuthentication();
    const data = await getOrdersByUserId({ user_id });
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return errorResponse(error);
  }
}
