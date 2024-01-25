import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { generateVerificationToken, verifyToken } from '@/utils/authHelpers';
import { sendVerificationEmail } from '@/utils/emailHelpers';
import { JwtPayload } from 'jsonwebtoken';

function errorResponse(
  errorObject: Record<string, string>,
  statusObject: {
    status: number;
    statusText: string;
  }
) {
  return new Response(JSON.stringify(errorObject), statusObject);
}

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
    return errorResponse(
      {
        error: 'Unauthorized. Please log in to continue.',
      },
      {
        status: 401,
        statusText: 'Unauthorized. Please log in to continue.',
      }
    );
  }

  try {
    const body: { token: string } = await req.json();
    const tokenParam = body.token;

    if (!tokenParam) {
      return errorResponse(
        {
          error: 'Missing token',
        },
        {
          status: 400,
          statusText: 'Missing token',
        }
      );
    }

    const verificationTokenRecord = await db.verificationToken.findUnique({
      where: { token: tokenParam },
    });
    if (!verificationTokenRecord) {
      return errorResponse(
        {
          error: 'Could not locate token',
        },
        {
          status: 400,
          statusText: 'Could not locate token',
        }
      );
    }
    if (verificationTokenRecord.userId !== session.user.id) {
      return errorResponse(
        {
          error: 'Unauthorized attempt',
        },
        {
          status: 401,
          statusText: 'Unauthorized attempt',
        }
      );
    }
    if (!verificationTokenRecord.valid) {
      return errorResponse(
        {
          error: 'This token has already been used. Please contact support.',
        },
        {
          status: 400,
          statusText:
            'This token has already been used. Please contact support.',
        }
      );
    }

    let decodedTokenParam;

    try {
      decodedTokenParam = verifyToken(tokenParam) as JwtPayload;
    } catch (err) {
      if (err instanceof Error) {
        const parsedError: { name: string; message: string } = JSON.parse(
          err.message
        );
        console.log(parsedError.message);
      }
    }

    if (
      // db verification token record
      isExpired(verificationTokenRecord.expires) ||
      // url token param
      isExpired(new Date(decodedTokenParam!.exp! * 1000))
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
      } catch (err) {
        if (err instanceof Error) {
          const parsedError: { name: string; message: string } = JSON.parse(
            err.message
          );
          console.log(parsedError.message);
        }
      }

      const newExpiry = new Date(decodedVerificationToken!.exp! * 1000);

      await db.verificationToken.update({
        where: { userId: session.user.id },
        data: {
          token: newVerificationToken,
          expires: newExpiry,
        },
      });

      sendVerificationEmail(newVerificationToken, session.user.email!);

      return errorResponse(
        {
          error:
            'Your token has expired. Please check your email for a new verification link.',
        },
        {
          status: 400,
          statusText:
            'Your token has expired. Please check your email for a new verification link.',
        }
      );
    }

    const uniqueIdentifier = `email-verification-${session.user.email}`;

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
      return errorResponse(
        {
          error: error.message,
        },
        {
          status: 500,
          statusText: error.message,
        }
      );
    }
  }
}

export { handler as PUT };
