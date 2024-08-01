'use server';

import { db } from '@/lib/prisma';
import { extractExpiration, generateVerificationToken } from '@/utils/token';
import { sendEmail } from '@/features/verify/utils.verify';
import type { VerificationToken } from '@prisma/client';

// ^ Expiration

export const dateNow = () => new Date().toISOString();

type IsExpired = {
  ({ expires }: { expires: Date }): boolean;
};

export const isExpired: IsExpired = ({ expires }) => {
  const now = new Date();

  if (expires < now) {
    return true;
  }

  return false;
};

interface IHandleExpiration {
  ({
    verificationRecord,
    token,
    email,
    id,
  }: {
    verificationRecord: VerificationToken;
    token: string;
    email: string;
    id: string;
  }): Promise<Response | void>;
}

export const handleExpiration: IHandleExpiration = async ({
  verificationRecord,
  token,
  email,
  id,
}) => {
  const dbTokenExpires = verificationRecord.expires;
  const urlTokenExpiration = extractExpiration(token);

  if (
    isExpired({ expires: dbTokenExpires }) ||
    isExpired({ expires: new Date(urlTokenExpiration * 1000) })
  ) {
    // Generate new verificationToken & record update
    const newVerificationToken = generateVerificationToken(email);
    const newTokenExpiration = extractExpiration(newVerificationToken);
    const newTokenExpiresAt = new Date(newTokenExpiration * 1000);

    try {
      await db.verificationToken.update({
        where: { userId: id },
        data: {
          token: newVerificationToken,
          expires: newTokenExpiresAt,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message) {
          return new Response(
            `Error Updating Token Expiration: ${error.message}`,
            {
              status: 500,
            }
          );
        }
      }
    }

    await sendEmail({
      verificationToken: newVerificationToken,
      email,
    });

    return new Response(
      'Expired Token: Please check your email for a new verification link.',
      { status: 400 }
    );
  }
};

// ^ Validation

interface IValidateVerificationRecord {
  ({
    record,
    id,
  }: {
    record: VerificationToken | null;
    id: string;
  }): Promise<ValidateVerificationRecordResponse | Response>;
}

type ValidateVerificationRecordResponse = {
  validRecord: VerificationToken;
};

export const validateVerificationRecord: IValidateVerificationRecord = async ({
  record,
  id,
}) => {
  if (!record) {
    return new Response('Invalid token: resource not found', {
      status: 400,
    });
  }

  const { userId, valid } = record;

  if (userId !== id) {
    return new Response('Unauthorized attempt: please log in to continue', {
      status: 401,
    });
  }

  if (!valid) {
    return new Response('Invalid token: a valid token is required', {
      status: 400,
    });
  }

  return {
    validRecord: record,
  };
};
