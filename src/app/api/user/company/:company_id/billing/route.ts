import { checkAuthentication } from '@/shared/utils/api/checkAuthentication';
import { errorResponse } from '@/shared/utils/api/errorResponse';
import { getSearchParamsOrThrow } from '@/shared/utils/api/getSearchParams';
import { getBillingByCompanyId } from '@/shared/utils/db/user';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    await checkAuthentication();
    const company_id = getSearchParamsOrThrow(
      req.nextUrl.searchParams,
      'company_id'
    );
    const data = await getBillingByCompanyId({
      company_id,
    });
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return errorResponse(error);
  }
}
