import { checkAuthentication } from '@/shared/utils/api/checkAuthentication';
import { errorResponse } from '@/shared/utils/api/errorResponse';
import { getCompanyWithAddressByUserId } from '@/shared/utils/db/user';

export async function GET() {
  try {
    const { user_id } = await checkAuthentication();
    const data = await getCompanyWithAddressByUserId({ user_id });
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return errorResponse(error);
  }
}
