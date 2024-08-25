import { UserAuthorization } from '@/types/user';
import { db } from '@/lib/prisma';
import { authenticateSession } from '@/utils/auth';

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
        email: true,
        isApproved: true,
        emailVerified: true,
      },
    });

    const responsePayload: UserAuthorization = {
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
