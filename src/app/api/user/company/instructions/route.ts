import {
  DeliveryInstructionsData,
  DeliveryInstructionsResponse,
} from '@/features/cart/types/index';
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
    const companyById = await db.company.findUniqueOrThrow({
      where: { userId: session.user.id },
      select: {
        id: true,
        name: true,
      },
    });

    const { id, name } = companyById;

    const shipping = await db.shippingAddress.update({
      where: { companyId: id },
      data: {
        deliveryInstructions,
      },
    });

    const response: DeliveryInstructionsResponse = {
      companyName: name,
      shippingAddress: shipping,
    };

    return new Response(JSON.stringify(response));
  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message, {
        status: 500,
      });
    }
  }
}
