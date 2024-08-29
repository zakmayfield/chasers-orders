import { checkAuthentication } from '@/shared/utils/api/checkAuthentication';
import { errorResponse } from '@/shared/utils/api/errorResponse';
import { getCartItems } from '@/shared/utils/db/cart';

export async function GET() {
  try {
    const { cart_id } = await checkAuthentication();
    const data = await getCartItems({ cart_id });
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return errorResponse(error);
  }
}
