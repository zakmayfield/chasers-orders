import { checkAuthentication } from '@/shared/utils/api/checkAuthentication';
import { errorResponse } from '@/shared/utils/api/errorResponse';
import { getSearchParams } from '@/shared/utils/api/getSearchParams';
import { getUserByEmail } from '@/shared/utils/db/user';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { email } = await checkAuthentication();
    const fullUser = getSearchParams(req.nextUrl.searchParams, 'full');

    const args = {
      email,
      fullUser: !!fullUser,
    };

    const data = await getUserByEmail({ ...args });
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return errorResponse(error);
  }
}
