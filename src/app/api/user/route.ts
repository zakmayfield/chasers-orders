import { checkAuthentication } from '@/shared/utils/api/checkAuthentication';
import { errorResponse } from '@/shared/utils/api/errorResponse';
import { getUserByEmail } from '@/shared/utils/db/user';

export async function GET() {
  try {
    const { email } = await checkAuthentication();
    const data = await getUserByEmail({ email });
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return errorResponse(error);
  }
}
