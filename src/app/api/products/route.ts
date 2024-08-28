import { checkAuthentication } from '@/shared/utils/api/checkAuthentication';
import { errorResponse } from '@/shared/utils/api/errorResponse';
import { getAllProducts } from '@/shared/utils/db/product';

export async function GET() {
  try {
    await checkAuthentication();
    const data = await getAllProducts();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return errorResponse(error);
  }
}
