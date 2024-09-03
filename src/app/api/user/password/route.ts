import { NextRequest } from 'next/server';
import { compare, genSalt, hash } from 'bcryptjs';
import { PasswordFormData } from '@/shared/types/Forms';
import { checkAuthentication } from '@/shared/utils/api/checkAuthentication';
import { errorResponse } from '@/shared/utils/api/errorResponse';
import { resolveRequestBody } from '@/shared/utils/api/resolveRequestBody';
import { db } from '@/lib/prisma';

async function handler(req: NextRequest) {
  try {
    const { user_id } = await checkAuthentication();

    // validate old password
    const { old_password, new_password } =
      await resolveRequestBody<PasswordFormData>(req);
    const user = await db.user.findUniqueOrThrow({
      where: { id: user_id },
      omit: {
        password: false,
      },
    });
    const match = await compare(old_password, user.password);
    if (!match) {
      return new Response('Old password is incorrect', { status: 401 });
    }

    // new password cannot equal old password
    if (new_password === old_password) {
      return new Response('New password cannot be the same as old password', {
        status: 400,
      });
    }
    // hash new password
    const hashed = await hash(new_password, await genSalt(12));

    // update user with new password hash
    await db.user.update({
      where: { id: user_id },
      data: {
        password: hashed,
      },
    });
    // return 'success' || errorMessage
    return new Response(JSON.stringify('success'));
  } catch (error) {
    return errorResponse(error);
  }
}
export { handler as PUT };
