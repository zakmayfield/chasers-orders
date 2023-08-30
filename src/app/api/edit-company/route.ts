import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { EditCompanyValidator } from '@/lib/validators/company';

export async function PATCH(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 });
    }

    const id = session.user.id;
    const body = await req.json();
    const { name } = EditCompanyValidator.parse(body);

    const updatedCompany = await db.company.upsert({
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

    console.log('-----updatedCompany-----', updatedCompany);

    return new Response('OK');
  } catch (err) {
    console.log('-----edit-company err-----', err);
    return new Response(
      'Could not update company at this time. Please try later',
      { status: 500 }
    );
  }
}
