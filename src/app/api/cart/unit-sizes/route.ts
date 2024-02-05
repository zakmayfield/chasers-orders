import { getAuthSession } from '@/lib/auth/auth.options';
import { db } from '@/lib/db/db.prisma-client';
import { NextRequest } from 'next/server';

async function handler(req: NextRequest) {
  const session = await getAuthSession();

  // determine user auth
  if (!session?.user) {
    return new Response('Unauthorized. Please log in to continue.', {
      status: 401,
    });
  }

  const searchParams = req.nextUrl.searchParams;
  const unitId = searchParams.get('unitId');

  if (!unitId) {
    return new Response('Invalid Unit ID', { status: 401 });
  }

  try {
    const sizes = await db.unit.findUnique({
      where: { id: unitId },
      select: {
        id: true,
        product: {
          select: {
            id: true,
            units: true,
          },
        },
      },
    });

    return new Response(JSON.stringify(sizes), {
      status: 200,
    });
  } catch (error) {
    if (error instanceof Error) {
      return (
        new Response(error.message),
        {
          status: 500,
        }
      );
    }
  }
}

export { handler as GET };
