import { DeliveryInstructionsData } from '@/features/cart/types/index';
import { db } from '@/lib/prisma';
import { getAuthSession } from '@/lib/auth/auth.options';

export async function PUT(req: Request) {
  const session = await getAuthSession();

  if (!session?.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  type ReqBody = DeliveryInstructionsData;
  const body: ReqBody = await req.json();
  const { deliveryInstructions } = body;

  try {
    const company = await db.company.update({
      where: { userId: session.user.id },
      data: {
        shippingAddress: {
          update: {
            data: {
              deliveryInstructions,
            },
          },
        },
      },
      select: {
        shippingAddress: {
          select: {
            deliveryInstructions: true,
          },
        },
      },
    });

    const updatedShippingInstructions =
      company &&
      company.shippingAddress &&
      company.shippingAddress.deliveryInstructions;

    return new Response(JSON.stringify(updatedShippingInstructions));
  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message, {
        status: 500,
      });
    }
  }
}
