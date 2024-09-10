import { checkAuthentication } from '@/shared/utils/api/checkAuthentication';
import { errorResponse } from '@/shared/utils/api/errorResponse';
import { getProductById } from '@/shared/utils/db/product';
import { NextRequest } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { product_id: string } }
) {
  try {
    await checkAuthentication();
    const product_id = params.product_id;

    const args = {
      product_id,
    };

    const data = await getProductById({ ...args });
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return errorResponse(error);
  }
}
