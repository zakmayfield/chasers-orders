import { getAuthSession } from '@/lib/auth/auth.options';
import { db } from '@/lib/prisma';
import { ShippingData } from '@/types/user';

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
        shippingAddress: true,
      },
    });

    if (!company || !company.shippingAddress) {
      return new Response('Could not get shipping address at this time', {
        status: 401,
      });
    }

    const payload: ShippingData = {
      companyName: company.name,
      shippingAddress: company.shippingAddress,
    };

    return new Response(JSON.stringify(payload));
  } catch (err) {
    return new Response('Could not get shipping address at this time', {
      status: 500,
    });
  }
}
