import { db } from '@/lib/prisma';
import { authenticateSession } from '@/shared/utils/api/authenticateSession';
import { TUserExtendedAuthorization } from '@/shared/types/User';

async function handler() {
  const sessionResponse = await authenticateSession();
  if (sessionResponse instanceof Response) {
    return sessionResponse;
  }
  const { id } = sessionResponse;

  try {
    const user = await db.user.findUniqueOrThrow({
      where: {
        id,
      },
      select: {
        email: true,
        is_approved: true,
        email_verified_on: true,
        role: true,
        permissions: true,
      },
    });

    const responsePayload: TUserExtendedAuthorization = {
      ...user,
    };

    return new Response(JSON.stringify(responsePayload));
  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }
  }
}

export { handler as GET };
