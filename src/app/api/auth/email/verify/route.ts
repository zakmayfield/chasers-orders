import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/prisma.db';
import { JwtPayload } from 'jsonwebtoken';
import {
  generateVerificationToken,
  verifyToken,
} from '@/utils/auth.manage-token';
import { sendVerificationEmail } from '@/utils/email.verification-email';
import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
} from '@prisma/client/runtime/library';

function isExpired(expires: Date) {
  const now = new Date();

  if (expires < now) {
    return true;
  }

  return false;
}

export async function handler(req: Request) {
  const session = await getAuthSession();

  // determine user auth
  if (!session?.user) {
    return new Response('Unauthorized. Please log in to continue.', {
      status: 401,
    });
  }

  try {
    const body: { token: string } = await req.json();
    const tokenParam = body.token;

    if (!tokenParam) {
      return new Response('Missing token', { status: 400 });
    }

    const verificationTokenRecord = await db.verificationToken.findUnique({
      where: { token: tokenParam },
    });
    if (!verificationTokenRecord) {
      return new Response('Could not locate token', { status: 400 });
    }
    if (verificationTokenRecord.userId !== session.user.id) {
      return new Response('Unauthorized attempt', { status: 401 });
    }
    if (!verificationTokenRecord.valid) {
      return new Response(
        'This token has already been used. Please contact support.',
        { status: 400 }
      );
    }

    let decodedToken;

    try {
      decodedToken = verifyToken(tokenParam) as JwtPayload;
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'JsonWebTokenError') {
          throw new Error(
            'The verification link contains an invalid token. This may be due to a technical issue. Please contact support.'
          );
        }
      }
    }

    if (
      // db verification token record
      isExpired(verificationTokenRecord.expires) ||
      // url token param
      isExpired(new Date(decodedToken?.exp! * 1000))
    ) {
      // Resend verification email with a newly generated verificationToken & record update
      const newVerificationToken = generateVerificationToken(
        session.user.email!
      );

      let decodedVerificationToken;

      try {
        decodedVerificationToken = verifyToken(
          newVerificationToken
        ) as JwtPayload;
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }

      const newExpiry = new Date(decodedVerificationToken!.exp! * 1000);

      try {
        await db.verificationToken.update({
          where: { userId: session.user.id },
          data: {
            token: newVerificationToken,
            expires: newExpiry,
          },
        });
      } catch (error) {
        const errorPrefix = 'Error updating new token';

        if (error instanceof PrismaClientKnownRequestError) {
          return new Response(`${errorPrefix}: ${error.message}`, {
            status: 500,
          });
        } else if (error instanceof PrismaClientUnknownRequestError) {
          return new Response(`${errorPrefix}: ${error.message}`, {
            status: 500,
          });
        } else {
          if (error instanceof Error) {
            return new Response(`${errorPrefix}: ${error.message}`, {
              status: 500,
            });
          }
        }
      }

      sendVerificationEmail(newVerificationToken, session.user.email!);

      return new Response(
        'Your token has expired. Please check your email for a new verification link.',
        { status: 400 }
      );
    }

    const uniqueIdentifier = `email-verification-${session.user.email}`;

    try {
      await db.user.update({
        where: { id: session.user.id },
        data: {
          emailVerified: new Date().toISOString(),
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
        return new Response(`${errorPrefix}: ${error.message}`, {
          status: 500,
        });
      } else if (error instanceof PrismaClientUnknownRequestError) {
        return new Response(`${errorPrefix}: ${error.message}`, {
          status: 500,
        });
      } else {
        if (error instanceof Error) {
          return new Response(`${errorPrefix}: ${error.message}`, {
            status: 500,
          });
        }
      }
    }

    return new Response(
      JSON.stringify({
        message: 'Email verification successfull',
        user: { id: session.user.id, email: session.user.email },
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }
  }
}

export { handler as PUT };
