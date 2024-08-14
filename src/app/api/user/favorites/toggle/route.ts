import { getAuthSession } from '@/lib/auth/auth.options';
import { NextRequest } from 'next/server';
import { headers } from 'next/headers';
import { db } from '@/lib/prisma';
import { ToggleFavoriteAction } from '@/types/products';

const handler = async (req: NextRequest) => {
  const session = await getAuthSession();

  if (!session || !session.user) {
    return new Response('Unauthenticated', { status: 401 });
  }

  const {
    productId,
    favoriteId,
  }: {
    productId: ToggleFavoriteAction['productId'];
    favoriteId: ToggleFavoriteAction['favoriteId'];
  } = await req.json();

  // ACTION HEADER
  const actionFlag = headers().get('x-action');
  let action: ToggleFavoriteAction['action'];

  function isValidAction(
    data: unknown
  ): data is ToggleFavoriteAction['action'] {
    return typeof data === 'string' && (data === 'add' || data === 'remove');
  }

  if (isValidAction(actionFlag)) {
    action = actionFlag;
  } else {
    return new Response('Invalid action', { status: 400 });
  }

  try {
    switch (action) {
      case 'add':
        const added = await db.favorite.create({
          data: {
            userId: session.user.id,
            productId: productId!,
          },
          include: {
            product: true,
          },
        });
        return new Response(JSON.stringify(added));

      case 'remove':
        const removed = await db.favorite.delete({
          where: {
            id: favoriteId,
          },
        });
        return new Response(JSON.stringify(removed));

      default:
        return new Response('Error assembling actions', { status: 500 });
    }
  } catch (error) {
    if (error instanceof Error) {
      return new Response(
        `Unable to ${action === 'add' ? 'add' : 'remove'} favorite at this time`,
        {
          status: 500,
        }
      );
    }
  }
};

export { handler as POST };
