import { getAuthSession } from '@/lib/auth/auth.options';
import { checkAuthentication } from '@/shared/utils/api/checkAuthentication';
import { errorResponse } from '@/shared/utils/api/errorResponse';
import { getCartWithItemsAndProductVariants } from '@/shared/utils/db/cart';

export async function GET() {
  const session = await getAuthSession();
  try {
    await checkAuthentication();

    const data = await getCartWithItemsAndProductVariants({
      user_id: session?.user.id!,
    });
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return errorResponse(error);
  }
}
