import { db } from '@/lib/prisma';
import {
  authenticateSession,
  handleExpiration,
  dateNow,
  validateVerificationToken,
} from '../helpers';
import { TokenValidatorResponse2 } from '@/features/dashboard/verify-email/services.verify-email';

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
      return new Response(JSON.stringify('Missing token'), { status: 400 });
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
    const currentDate = dateNow();

    await db.user.update({
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
    });

    // TODO: populate verify response type and object
    const verifyResponsePayload: TokenValidatorResponse2 = {
      response: 'Email successfully verified',
      email,
      verifiedOn: currentDate,
    };

    // Happy path
    return new Response(JSON.stringify(verifyResponsePayload));
  } catch (error) {
    if (error instanceof Error) {
      if (error.message) {
        return new Response(JSON.stringify(error.message), { status: 500 });
      }
    }
  }
}

export { handler as PUT };
