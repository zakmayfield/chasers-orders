import { NextRequest } from 'next/server';
import {
  dateNow,
  handleExpiration,
  validateVerificationRecord,
} from '@/features/verify/helpers.api';
import { authenticateSession } from '@/features/auth/helpers.api';
import { VerifyAPIResponse, VerifyMutationArgs } from '@/features/verify/types';
import { db } from '@/lib/prisma';

type RequestPayload = VerifyMutationArgs;
const errorPrefix = 'Error processing your request:';

async function handler(req: NextRequest) {
  const session = await authenticateSession();
  if (session instanceof Response) {
    return session;
  }
  const { id, email } = session;

  const requestPayload: RequestPayload = await req.json();
  if (!requestPayload.token) {
    return new Response(`${errorPrefix} token is required`, {
      status: 400,
    });
  }
  const { token } = requestPayload;

  try {
    //* Database Verification Record
    const verificationTokenRecord = await db.verificationToken.findUnique({
      where: { token },
    });

    //* Validate database record token
    const validateRecordResponse = await validateVerificationRecord({
      record: verificationTokenRecord,
      id,
    });
    if (validateRecordResponse instanceof Response) {
      return validateRecordResponse;
    }
    const { validRecord } = validateRecordResponse;

    //* Expiration validation
    const expirationResponse = await handleExpiration({
      verificationRecord: validRecord,
      token,
      email,
      id,
    });
    if (expirationResponse instanceof Response) {
      return expirationResponse;
    }

    //* Unique identifier
    const uniqueIdentifier = `email-verification-${email}`;

    //* Update user and verification token records
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

    const verifyPayload: VerifyAPIResponse = {
      accepted: true,
      id,
      email,
      verifiedOn: currentDate,
    };

    return new Response(JSON.stringify(verifyPayload));
  } catch (error) {
    if (error instanceof Error) {
      return new Response(`${errorPrefix} ${error.message}`, {
        status: 500,
      });
    }

    return new Response('Internal server error', {
      status: 500,
    });
  }
}

export { handler as PUT };
