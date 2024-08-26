import { NextRequest } from 'next/server';
import { db } from '@/lib/prisma';
import { authenticateSession } from '@/shared/utils/api/authenticateSession';
import { sendEmail } from '@/shared/utils/email/sendEmail';
import {
  extractExpiration,
  generateVerificationToken,
} from '@/shared/utils/helpers';
import {
  TUpdateUserVerificationRequest,
  TUpdateUserVerificationResponse,
} from '@/shared/types/API';

const dateNow = () => new Date().toISOString();

const isExpired = ({ expires }: { expires: Date }) => {
  const now = new Date();

  if (expires < now) {
    return true;
  }

  return false;
};

async function handler(req: NextRequest) {
  const session = await authenticateSession();

  if (session instanceof Response) {
    return session;
  }

  const { id, email } = session;

  const body: TUpdateUserVerificationRequest = await req.json();

  if (!body.token) {
    return new Response(`Token required`, {
      status: 400,
    });
  }

  const { token } = body;

  try {
    const verificationToken = await db.verificationToken.findUnique({
      where: { token },
    });

    //^ Validate verification token
    if (!verificationToken) {
      return new Response('Invalid token: resource not found', {
        status: 400,
      });
    }

    if (verificationToken.user_id !== id) {
      return new Response('Unauthorized attempt: please log in to continue', {
        status: 401,
      });
    }

    if (!verificationToken.is_valid) {
      return new Response('Invalid token: a valid token is required', {
        status: 400,
      });
    }

    //^ Validate verification token expiration
    const dbTokenExpires = verificationToken.expires;
    const urlTokenExpiration = extractExpiration(token);

    if (
      isExpired({ expires: dbTokenExpires }) ||
      isExpired({ expires: new Date(urlTokenExpiration * 1000) })
    ) {
      const newVerificationToken = generateVerificationToken(email);
      const newTokenExpiration = extractExpiration(newVerificationToken);
      const newTokenExpiresAt = new Date(newTokenExpiration * 1000);

      await db.verificationToken.update({
        where: { user_id: id },
        data: {
          token: newVerificationToken,
          expires: newTokenExpiresAt,
        },
      });

      await sendEmail({
        type: 'verification',
        to: email,
        verificationToken: newVerificationToken,
      });

      return new Response(
        'Expired Token: Please check your email for a new verification link',
        { status: 400 }
      );
    }

    //^ Construct verification token data
    const uniqueIdentifier = `email-verification-${email}`;
    const currentDate = dateNow();

    const user = await db.user.update({
      where: { id },
      data: {
        email_verified_on: currentDate,
        verification_token: {
          update: {
            where: {
              identifier: uniqueIdentifier,
            },
            data: {
              is_valid: false,
            },
          },
        },
      },
      select: {
        id: true,
        is_approved: true,
        email_verified_on: true,
      },
    });

    // TODO: Update these prop names
    const updateVerificationResponse: TUpdateUserVerificationResponse = {
      id,
      email,
      is_approved: user.is_approved,
      email_verified_on: user.email_verified_on,
    };

    return new Response(JSON.stringify(updateVerificationResponse));
  } catch (error) {
    if (error instanceof Error) {
      return new Response('Unable to verify email at this time', {
        status: 500,
      });
    }
  }
}

export { handler as PUT };
