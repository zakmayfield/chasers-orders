import { NextRequest } from 'next/server';
import { db } from '@/lib/prisma';
import { authenticateSession } from '@/utils/auth';
import { sendEmail } from '@/utils/email';
import { extractExpiration, generateVerificationToken } from '@/utils/token';
import {
  UpdateUserVerificationRequest,
  UpdateUserVerificationResponse,
} from '@/types/verification';

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

  const body: UpdateUserVerificationRequest = await req.json();

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

    if (verificationToken.userId !== id) {
      return new Response('Unauthorized attempt: please log in to continue', {
        status: 401,
      });
    }

    if (!verificationToken.valid) {
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
        where: { userId: id },
        data: {
          token: newVerificationToken,
          expires: newTokenExpiresAt,
        },
      });

      await sendEmail({
        verificationToken: newVerificationToken,
        email,
      });

      return new Response(
        'Expired Token: Please check your email for a new verification link.',
        { status: 400 }
      );
    }

    //^ Construct verification token data
    const uniqueIdentifier = `email-verification-${email}`;
    const currentDate = dateNow();

    const user = await db.user.update({
      where: { id },
      data: {
        emailVerified: currentDate,
        verificationToken: {
          update: {
            where: {
              identifier: uniqueIdentifier,
            },
            data: {
              valid: false,
            },
          },
        },
      },
      select: {
        id: true,
        isApproved: true,
      },
    });

    const updateVerificationResponse: UpdateUserVerificationResponse = {
      accepted: true,
      id,
      email,
      verifiedOn: currentDate,
      isApproved: user.isApproved,
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
