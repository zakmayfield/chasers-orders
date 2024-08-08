import { db } from '@/lib/prisma';
import { getAuthSession } from '@/lib/auth/auth.options';
import { CompanyFormData } from '@/shared/validators/user/CompanyValidator';

export async function PUT(req: Request) {
  const session = await getAuthSession();

  if (!session?.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  type ReqBody = CompanyFormData;
  const body: ReqBody = await req.json();

  try {
    const updatedCompany = await db.company.update({
      where: {
        userId: session.user.id,
      },
      data: body,
    });

    return new Response(JSON.stringify(updatedCompany));
  } catch (error) {
    if (error instanceof Error) {
      return new Response('Unable to update company information at this time', {
        status: 500,
      });
    }
  }
}
