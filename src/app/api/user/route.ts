import { getAuthSession } from '@/lib/auth/auth.options';
import { db } from '@/lib/prisma';

export async function GET() {
  const session = await getAuthSession();

  const { id } = session?.user!;

  try {
    const user = await db.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        isApproved: true,
        emailVerified: true,
        contact: {
          select: {
            id: true,
            name: true,
            phoneNumber: true,
            position: true,
          },
        },
        orders: {
          take: 1,
          orderBy: {
            createdAt: 'desc',
          },
          select: {
            id: true,
            createdAt: true,
          },
        },
        favorites: {
          orderBy: {
            createdAt: 'desc',
          },
          select: {
            id: true,
            createdAt: true,
            juiceId: true,
            juice: true,
          },
        },
        company: {
          select: {
            id: true,
            name: true,
            shippingAddress: true,
            billingAddress: true,
            paymentMethod: true,
            accountPayableEmail: true,
          },
        },
      },
    });

    if (!user) {
      return new Response('Could not fetch user data', { status: 404 });
    }

    return new Response(JSON.stringify(user));
  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }
  }
}
