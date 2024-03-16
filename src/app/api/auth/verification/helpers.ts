'use server';

import { db } from '@/lib/prisma';
import { getAuthSession } from '@/lib/auth/auth.options';
import {
  extractExpiration,
  generateVerificationToken,
} from '@/utils/token.utils';
import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
} from '@prisma/client/runtime/library';
import type { VerificationToken } from '@prisma/client';
import { sendEmail } from '@/features/dashboard/verify-email/utils.verify-email';

// ^ Session

interface IAuthenticateSession {
  (): Promise<AuthenticateSessionReturn | Response>;
}

type AuthenticateSessionReturn = {
  id: string;
  email: string;
};

export const authenticateSession: IAuthenticateSession = async () => {
  const session = await getAuthSession();

  if (!session || !session.user) {
    return new Response('Unauthorized: Please log in to continue.', {
      status: 401,
    });
  }

  const { id, email } = session.user;

  return {
    id,
    email: email!,
  };
};

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
  const urlTokenExpiration = extractExpiration(token);
  const dbTokenExpires = verificationRecord.expires;

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
            JSON.stringify(`Error Updating Token Expiration: ${error.message}`),
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
      JSON.stringify(
        'Expired Token: Please check your email for a new verification link.'
      ),
      { status: 400 }
    );
  }
};

// ^ Validation

interface IValidateVerificationToken {
  ({
    token,
    id,
  }: {
    token: VerificationToken | null;
    id: string;
  }): Promise<ValidateVerificationTokenResponse | Response>;
}

type ValidateVerificationTokenResponse = {
  validTokenRecord: VerificationToken;
};

export const validateVerificationToken: IValidateVerificationToken = async ({
  token,
  id,
}) => {
  if (!token) {
    return new Response(JSON.stringify('Could not locate token'), {
      status: 400,
    });
  }

  if (token.userId !== id) {
    return new Response(JSON.stringify('Unauthorized attempt'), {
      status: 401,
    });
  }

  if (!token.valid) {
    return new Response(
      JSON.stringify(
        'This token has already been used. Please contact support.'
      ),
      { status: 400 }
    );
  }

  return {
    validTokenRecord: token,
  };
};
