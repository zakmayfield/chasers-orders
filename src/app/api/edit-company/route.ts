import { getAuthSession } from '@/lib/auth/auth.options';
import { db } from '@/lib/db/db.prisma-client';
import { EditCompanyValidator } from '@/lib/validators/validator.company';

export async function PATCH(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 });
    }

    const id = session.user.id;
    const body = await req.json();
    const { name } = EditCompanyValidator.parse(body);

    await db.company.upsert({
      where: {
        userId: id,
      },
      update: {
        name,
      },
      create: {
        name,
        userId: id,
      },
    });

    return new Response('OK');
  } catch (err) {
    return new Response(
      'Could not update company at this time. Please try later',
      { status: 500 }
    );
  }
}
