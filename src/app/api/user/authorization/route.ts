import { getAuthSession } from '@/lib/auth/auth.options';
import { checkAuthentication } from '@/shared/utils/api/checkAuthentication';
import { errorResponse } from '@/shared/utils/api/errorResponse';
import { getUserAuthorizationByEmail } from '@/shared/utils/db/user';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const session = await getAuthSession();
  try {
    await checkAuthentication();
    const data = await getUserAuthorizationByEmail({
      email: session?.user.email!,
    });
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return errorResponse(error);
  }
}
