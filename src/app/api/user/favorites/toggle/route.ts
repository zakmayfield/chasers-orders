import { getAuthSession } from '@/lib/auth/auth.options';
import { NextRequest } from 'next/server';
import { headers } from 'next/headers';
import { db } from '@/lib/prisma';
import { Actions } from '@/features/products/types';

const handler = async (req: NextRequest) => {
  const session = await getAuthSession();

  if (!session || !session.user) {
    return new Response('Unauthenticated', { status: 401 });
  }

  const body: { id: string } = await req.json();
  const { id } = body;

  if (!id) {
    return new Response('Invalid input', { status: 400 });
  }

  // ACTION HEADER
  const headersList = headers();
  const actionFlag = headersList.get('x-action');
  let action: Actions;

  function isValidAction(data: unknown): data is Actions {
    return typeof data === 'string' && (data === 'add' || data === 'remove');
  }

  if (isValidAction(actionFlag)) {
    action = actionFlag;
  } else {
    return new Response('Invalid action', { status: 400 });
  }

  console.log({ actionFlag, action });

  // ACTION TYPES
  type AddAction = { juiceId: string };
  type RemoveAction = { favoriteId: string };

  try {
    switch (action) {
      case 'add':
        const add: AddAction = { juiceId: id };
        const added = await db.favorite.create({
          data: {
            juiceId: add.juiceId,
            userId: session.user.id,
          },
          select: {
            id: true,
            createdAt: true,
            juiceId: true,
            juice: true,
          },
        });
        return new Response(JSON.stringify(added));

      case 'remove':
        const remove: RemoveAction = { favoriteId: id };
        const removed = await db.favorite.delete({
          where: { id: remove.favoriteId },
          select: {
            id: true,
            createdAt: true,
            juiceId: true,
          },
        });
        return new Response(JSON.stringify(removed));

      default:
        return new Response('Error assembling actions', { status: 500 });
    }
  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }
  }
};

export { handler as POST };
