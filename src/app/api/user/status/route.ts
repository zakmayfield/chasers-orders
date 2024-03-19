import { authenticateSession } from '@/features/auth/helpers.api';
import { UserStatusAPIResponse } from '@/features/dashboard/account-pending/types';
import { db } from '@/lib/prisma';
import type { NextRequest } from 'next/server';

async function handler(req: NextRequest) {
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
