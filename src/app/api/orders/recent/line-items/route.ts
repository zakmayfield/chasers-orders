import { getAuthSession } from '@/lib/auth/auth.options';
import { db } from '@/lib/prisma';
import { headers } from 'next/headers';

export async function GET() {
  // Auth check
  const session = await getAuthSession();
  if (!session || !session.user) {
    return new Response('Unauthenticated', { status: 401 });
  }

  // Extract Order ID
  const headersList = headers();
  const orderId = headersList.get('x-order-id');

  if (!orderId) {
    return new Response('Order ID is required');
  }

  // Data try...catch
  try {
    const lineItemProductsOnOrder = await db.order.findUnique({
      where: { id: orderId },
      select: {
        id: true,
        lineItems: {
          select: {
            id: true,
            unit: {
              select: {
                id: true,
                product: true,
              },
            },
          },
        },
      },
    });

    return new Response(JSON.stringify(lineItemProductsOnOrder));
  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }
  }
}
