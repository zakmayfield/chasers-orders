import { db } from '@/lib/prisma';
import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
} from '@prisma/client/runtime/library';
import {
  authenticateSession,
  handleExpiration,
  dateNow,
  validateVerificationToken,
} from '../helpers';

async function handler(req: Request) {
  // session
  const sessionResponse = await authenticateSession();
  if (sessionResponse instanceof Response) return sessionResponse;
  const { id, email } = sessionResponse;

  try {
    // body
    const body: { token: string } = await req.json();
    const tokenParam = body.token;

    // URL token
    if (!tokenParam) {
      return new Response('Missing token', { status: 400 });
    }

    // DB Verification Record
    const verificationTokenRecord = await db.verificationToken.findUnique({
      where: { token: tokenParam },
    });

    // Validate DB Record token
    const validateTokenResponse = await validateVerificationToken({
      token: verificationTokenRecord,
      id,
    });
    if (validateTokenResponse instanceof Response) {
      return validateTokenResponse;
    }
    const { validTokenRecord } = validateTokenResponse;

    // Expiration validation
    const expirationResponse = await handleExpiration({
      verificationRecord: validTokenRecord,
      token: tokenParam,
      email,
      id,
    });
    if (expirationResponse instanceof Response) {
      return expirationResponse;
    }

    // Unique identifier
    const uniqueIdentifier = `email-verification-${email}`;

    // Update user and verification token records
    try {
      await db.user.update({
        where: { id },
        data: {
          emailVerified: dateNow(),
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
      });
    } catch (error) {
      const errorPrefix = 'Error updating verification records';

      if (error instanceof PrismaClientKnownRequestError) {
        return new Response(
          JSON.stringify(`${errorPrefix}: ${error.message}`),
          {
            status: 500,
          }
        );
      } else if (error instanceof PrismaClientUnknownRequestError) {
        return new Response(
          JSON.stringify(`${errorPrefix}: ${error.message}`),
          {
            status: 500,
          }
        );
      } else {
        if (error instanceof Error) {
          return new Response(
            JSON.stringify(`${errorPrefix}: ${error.message}`),
            {
              status: 500,
            }
          );
        }
      }
    }

    // Happy path
    return new Response(JSON.stringify('Email verification successfull'));
  } catch (error) {
    if (error instanceof Error) {
      return new Response(JSON.stringify(error.message), { status: 500 });
    }
  }
}

export { handler as PUT };
