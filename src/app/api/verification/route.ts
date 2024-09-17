import { NextRequest } from 'next/server';
import { db } from '@/lib/prisma';
import { sendEmail } from '@/shared/utils/email/sendEmail';
import { resolveRequestBody } from '@/shared/utils/api/resolveRequestBody';
import {
  TUpdateVerificationResponse,
  TVerificationToken,
} from '@/shared/types/User';
import { sign, verify } from 'jsonwebtoken';
import { NEXTAUTH_SECRET } from '@/shared/utils/constants';
import { checkAuthentication } from '@/shared/utils/api/checkAuthentication';
import { errorResponse } from '@/shared/utils/api/errorResponse';

const isExpired = ({ expires }: { expires: Date }) => {
  // if date attempting to verify (now) is greater than the alloted expiration date then return true (expired)
  const now = new Date();
  return expires < now;
};

function validateToken(
  v_token: TVerificationToken | null,
  url_token: string,
  user_id: string
) {
  let response: Response | null = null;

  if (!v_token) {
    response = new Response('Invalid token: resource not found', {
      status: 400,
    });
  }

  if (v_token?.user_id !== user_id) {
    response = new Response('Unauthorized attempt: please log in to continue', {
      status: 401,
    });
  }

  if (!v_token?.is_valid) {
    response = new Response('Invalid token: a valid token is required', {
      status: 400,
    });
  }

  if (v_token?.token !== url_token) {
    response = new Response(
      'Invalid token: please check your email for an updated verification link',
      {
        status: 400,
      }
    );
  }

  return response;
}

async function handleExpiredVToken(
  v_token_exp: Date,
  email: string,
  user_id: string
) {
  let response: Response | null = null;
  const is_v_token_expired = isExpired({ expires: v_token_exp });

  if (is_v_token_expired) {
    const new_jwt = sign({ email }, NEXTAUTH_SECRET!, {
      expiresIn: '48h',
    });

    const verified_jwt = verify(new_jwt, NEXTAUTH_SECRET!);

    if (typeof verified_jwt !== 'string') {
      const t_exp_ms = verified_jwt.exp! * 1000;
      const expires = new Date(t_exp_ms);

      await db.verificationToken.update({
        where: { user_id },
        data: {
          token: new_jwt,
          expires,
        },
      });
      await sendEmail({
        type: 'verification',
        to: email,
        token: new_jwt,
      });
    } else {
      return null;
    }

    response = new Response(
      'Expired Token: Please check your email for a new verification link',
      { status: 400 }
    );
  }

  return response;
}

async function handleVerification(email: string, user_id: string) {
  const unique_identifier = `email-verification-${email}`;
  const current_date = new Date();

  const user = await db.user.update({
    where: { id: user_id },
    data: {
      email_verified_on: current_date,
      verification_token: {
        update: {
          where: {
            identifier: unique_identifier,
          },
          data: {
            is_valid: false,
          },
        },
      },
    },
    select: {
      email_verified_on: true,
    },
  });

  return user;
}

async function handler(req: NextRequest) {
  const { user_id, email } = await checkAuthentication();
  const { token } = await resolveRequestBody<{ token: string }>(req);

  if (!token) {
    return new Response(`Token required`, {
      status: 400,
    });
  }

  try {
    const v_token = await db.verificationToken.findUnique({ where: { token } });

    const validation = validateToken(v_token, token, user_id);
    if (validation instanceof Response) {
      return validation;
    }

    const expiration = await handleExpiredVToken(
      v_token?.expires!,
      email,
      user_id
    );
    if (expiration instanceof Response) {
      return expiration;
    }

    const { email_verified_on } = await handleVerification(email, user_id);

    const response: TUpdateVerificationResponse = {
      email,
      email_verified_on,
    };

    return new Response(JSON.stringify(response));
  } catch (error) {
    return errorResponse(error);
  }
}

export { handler as PUT };
