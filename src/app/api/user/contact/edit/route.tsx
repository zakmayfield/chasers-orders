import { db } from '@/lib/prisma';
import { NextRequest } from 'next/server';
import { getAuthSession } from '@/lib/auth/auth.options';
import { ContactFormData } from '@/features/dashboard/home/components/contact/validator/contact.validator';
import type { Contact } from '@prisma/client';

export async function PUT(req: NextRequest) {
  const session = await getAuthSession();

  // determine user auth
  // test
  if (!session?.user) {
    return new Response('Unauthorized. Please log in to continue.', {
      status: 401,
    });
  }

  try {
    type ReqBody = ContactFormData;
    const body: ReqBody = await req.json();

    const updatedContact = await db.contact.update({
      where: { userId: session.user.id },
      data: body,
    });

    return new Response(JSON.stringify(updatedContact), {
      status: 200,
    });
  } catch (error) {
    if (error instanceof Error) {
      return (
        new Response(error.message),
        {
          status: 500,
        }
      );
    }
  }
}
