import { checkAuthentication } from '@/shared/utils/api/checkAuthentication';
import { errorResponse } from '@/shared/utils/api/errorResponse';
import { getProductVariantById } from '@/shared/utils/db/product';

export async function GET({
  params,
}: {
  params: { product_variant_id: string };
}) {
  try {
    await checkAuthentication();
    const product_variant_id = params.product_variant_id;

    const args = {
      product_variant_id,
    };

    const data = await getProductVariantById({ ...args });
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return errorResponse(error);
  }
}
