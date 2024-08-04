import { authenticateSession } from '@/features/auth/helpers.api';
import { UserStatusAPIResponse } from '@/types/dashboard';
import { db } from '@/lib/prisma';

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
        id: true,
        isApproved: true,
        emailVerified: true,
      },
    });

    const responsePayload: UserStatusAPIResponse = {
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
