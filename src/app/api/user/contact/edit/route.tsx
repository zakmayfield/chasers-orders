import { db } from '@/lib/prisma';
import { NextRequest } from 'next/server';
import { getAuthSession } from '@/lib/auth/auth.options';
import { ContactFormData } from '@/shared/validators/user/ContactValidator';

export async function PUT(req: NextRequest) {
  const session = await getAuthSession();

  if (!session?.user) {
    return new Response('Unauthorized. Please log in to continue.', {
      status: 401,
    });
  }

  type ReqBody = ContactFormData;
  const body: ReqBody = await req.json();

  try {
    const updatedContact = await db.contact.update({
      where: { userId: session.user.id },
      data: body,
    });

    return new Response(JSON.stringify(updatedContact), {
      status: 200,
    });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message, {
        status: 500,
      });
    }
  }
}
