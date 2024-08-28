import { getAuthSession } from '@/lib/auth/auth.options';
import { checkAuthentication } from '@/shared/utils/api/checkAuthentication';
import { errorResponse } from '@/shared/utils/api/errorResponse';
import { getFullUserByEmail } from '@/shared/utils/db/user';

export async function GET() {
  const session = await getAuthSession();
  try {
    await checkAuthentication();

    const data = await getFullUserByEmail({
      email: session?.user.email!,
    });
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return errorResponse(error);
  }
}
