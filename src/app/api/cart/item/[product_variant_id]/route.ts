import { checkAuthentication } from '@/shared/utils/api/checkAuthentication';
import { errorResponse } from '@/shared/utils/api/errorResponse';
import { getCartItem } from '@/shared/utils/db/cart';

export async function GET({
  params,
}: {
  params: { product_variant_id: string };
}) {
  try {
    const { cart_id } = await checkAuthentication();
    const product_variant_id = params.product_variant_id;

    const args = {
      cart_id,
      product_variant_id,
    };

    const data = await getCartItem({ ...args });
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return errorResponse(error);
  }
}
