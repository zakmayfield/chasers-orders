import { NextRequest } from 'next/server';
import { checkAuthentication } from '@/shared/utils/api/checkAuthentication';
import { errorResponse } from '@/shared/utils/api/errorResponse';
import { getSearchParams } from '@/shared/utils/api/getSearchParams';
import { getCompanyByUserId } from '@/shared/utils/db/user';

export async function GET(req: NextRequest) {
  try {
    const { user_id } = await checkAuthentication();
    const hasAddress = !!getSearchParams(req.nextUrl.searchParams, 'address');

    const args = {
      user_id,
      hasAddress,
    };

    const data = await getCompanyByUserId({ ...args });
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return errorResponse(error);
  }
}
