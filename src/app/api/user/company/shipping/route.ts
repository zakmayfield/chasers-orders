import { getAuthSession } from '@/lib/auth/auth.options';
import { db } from '@/lib/prisma';
import { ShippingAddress } from '@prisma/client';

export type GetShippingPayload = {
  shippingAddress: ShippingAddress | null;
  companyName?: string;
};

export async function GET() {
  const session = await getAuthSession();

  if (!session?.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const id = session.user.id;

    const company = await db.company.findUnique({
      where: {
        userId: id,
      },
      select: {
        id: true,
        name: true,
      },
    });

    const shippingAddress = await db.shippingAddress.findUnique({
      where: { companyId: company?.id },
    });

    const payload: GetShippingPayload = {
      companyName: company?.name,
      shippingAddress,
    };

    return new Response(JSON.stringify(payload));
  } catch (err) {
    return new Response(
      'Could not update company at this time. Please try later',
      { status: 500 }
    );
  }
}
