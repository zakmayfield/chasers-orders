import { checkAuthentication } from '@/shared/utils/api/checkAuthentication';
import { errorResponse } from '@/shared/utils/api/errorResponse';
import { getAllProductsWithVariants } from '@/shared/utils/db/product';

export async function GET() {
  try {
    await checkAuthentication();
    const data = await getAllProductsWithVariants();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return errorResponse(error);
  }
}
