import { checkAuthentication } from '@/shared/utils/api/checkAuthentication';
import { errorResponse } from '@/shared/utils/api/errorResponse';
import { getBillingByCompanyId } from '@/shared/utils/db/user';

export async function GET({ params }: { params: { company_id: string } }) {
  try {
    await checkAuthentication();
    const company_id = params.company_id;

    const data = await getBillingByCompanyId({
      company_id,
    });
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return errorResponse(error);
  }
}
